import React, { useState, useEffect, useReducer } from 'react';
import {
	Button,
	FormControl,
	Link,
	TextField,
	Dialog,
	DialogContent,
	DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import * as CMS_API from '../utilities/contentManagementAPI.js';
import LoadingIndicator from '../../loading/LoadingIndicator';

import * as permissions from '../utilities/permission.js';
import { processLinkProps } from '../utilities/buttonCms.js';

import { EditButton } from '../ContentManagementSection';
import IconForButtonLink from './IconForButtonLink';
import RadioButtonSection from './RadioButtonSection';
import Feedback from './Feedback';
import {
	buttonOptions as buttonOptionsData,
	linkOptions as linkOptionsData,
} from './buttonOptionsData';

function getButtonInfo() {
	return {
		color: 'default',
		variant: 'text',
		disabled: 'false',
		disableElevation: 'false',
		fullWidth: 'false',
		size: 'medium',
	};
}

function getLinkInfo() {
	return {
		color: 'primary',
		variant: 'inherit',
		disabled: 'false',
		underline: 'hover',
		display: 'initial',
		gutterBottom: 'false',
		leftIcon: 'none',
		rightIcon: 'none',
	};
}

const buttonFields = {
	size: true,
	color: true,
	disabled: true,
	variant: true,
	disableElevation: true,
	fullWidth: true,
	leftIcon: true,
	rightIcon: true,
};

const linkFields = {
	underline: true,
	gutterBottom: true,
	color: true,
	disabled: true,
	display: true,
	variant: true,
	leftIcon: true,
	rightIcon: true,
};

function reducer(state, action) {
	switch (//nosonar - set up as switch for possible future mods
		action.type
	) {
		case 'resetAll':
			const acceptedFields =
				action.componentType === 'link' ? linkFields : buttonFields;
			const filteredAction = _.pickBy(
				action,
				(_value, key) => acceptedFields[key]
			);
			return action ? filteredAction : state;
		default:
			return { ...state, [action?.field]: action?.payload };
	}
}

const useStyles = makeStyles({
	form: {
		width: 800,
		marginTop: 20,
	},
	input: {
		margin: '0 0 20px',
	},
	container: {
		marginTop: '2em', // adjusting for classification banner
		paddingTop: ({ offset }) => offset ?? offset, // adjust for additional banners
	},
});

export default function ButtonLinkCMS({
	page,
	buttonName,
	buttonStyles,
	containerStyles = {},
	linkPrefix = '',
	hrefTarget,
	iconStyles,
	linkStyles = {},
	linkTextStyles = {},
	bannerOffset,
}) {
	const [feedback, setFeedback] = useState(null);
	const [currentFormData, setCurrentFormData] = useState({});
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [componentType, setComponentType] = useState('button');
	const [text, setText] = useState('');
	const [href, setHref] = useState('');
	const hasPermissionToEdit = permissions.allowEditCMS(page);

	const classes = useStyles({ offset: bannerOffset });

	const [buttonOptionsState, buttonDispatch] = useReducer(
		reducer,
		null,
		getButtonInfo
	);

	const [linkOptionsState, linkDispatch] = useReducer(
		reducer,
		null,
		getLinkInfo
	);

	const refreshData = ({ data }) => {
		setCurrentFormData(data);
		setComponentType(data.componentType || 'button');
		setText(data.text || '');
		setHref(data.href || '');
		if (data.componentType === 'link') {
			linkDispatch({ ...data, type: 'resetAll' });
		} else {
			buttonDispatch({ ...data, type: 'resetAll' });
		}
	};

	useEffect(() => {
		CMS_API.buttonLinkCmsGET(page, buttonName, refreshData, (err) => {
			console.error(err);
		});
	}, [page, buttonName]);

	const handleSaveClick = () => {
		if (loading) return;
		setLoading(true);
		const data =
			componentType === 'link' ? linkOptionsState : buttonOptionsState;

		async function postButton() {
			try{
				const button = await CMS_API.buttonLinkCmsPOST(
					{ ...data, page, buttonName, componentType, text, href }
				);
				refreshData({data: button?.data?.message});
				setLoading(false);
				setFeedback((prevState) => {
					const alreadyHasSuccessMessage =
					prevState === 'success' ||
					(Array.isArray(prevState) &&
						prevState[prevState?.length - 1] === 'success');

					if (alreadyHasSuccessMessage) {
						return [...prevState, 'success'];
					}
					return ['success'];
				});
			} catch(error) {
				setLoading(false);
				const messages = error;
				if (typeof messages === 'string') {
					setFeedback([messages]);
				} else if (messages?.message) {
					setFeedback([messages?.message]);
				} else if (Array.isArray(messages)) {
					setFeedback(messages?.map((message) => message?.message));
				} else {
					setFeedback(['An error occured and the button could not be saved']);
				}
			}
		}
		postButton()
	};

	const handleCancelClick = () => {
		setEditMode(false);
		refreshData({ data: currentFormData });
	};
	const blank = href ? { target: hrefTarget || '_blank', rel: 'noreferrer' } : {};
	const linkdata =
		componentType === 'link' ? linkOptionsData : buttonOptionsData;
	const linkdispatch = componentType === 'link' ? linkDispatch : buttonDispatch;
	const linkstate =
		componentType === 'link' ? linkOptionsState : buttonOptionsState;
	return (
		<div
			style={{ ...styles.outerContainer(editMode), ...containerStyles }}
			data-test-id="button-link-cms"
		>
			{hasPermissionToEdit && (
				<EditButton
					handleClick={(e) => {
						setEditMode((prevState) => !prevState);
						e.stopPropagation();
					}}
				/>
			)}
			{componentType === 'link' ? (
				<Link
					data-test-id={`cms-index-${text}-link`}
					{...processLinkProps({ linkOptionsState, href: linkPrefix + href })}
					style={buttonStyles}
				>
					<div style={linkStyles}>
						{
							<IconForButtonLink
								icon={linkOptionsState.leftIcon}
								style={iconStyles || styles.linkIcons}
							/>
						}
						<div style={linkTextStyles}>
							{text}
						</div>
						{
							<IconForButtonLink
								icon={linkOptionsState.rightIcon}
								style={iconStyles || styles.linkIcons}
							/>
						}
					</div>
				</Link>
			) : (
				<Button
					data-test-id={`cms-index-${text}-button`}
					{..._.mapValues(buttonOptionsState, (value, _key) => {
						if (value === 'true') return true;
						if (value === 'false') return false;

						return value;
					})}
					href={linkPrefix + href}
					style={buttonStyles}
					{...blank}
				>
					{
						<IconForButtonLink
							icon={buttonOptionsState.leftIcon}
							style={styles.buttonIcons}
						/>
					}
					{text}
					{
						<IconForButtonLink
							icon={buttonOptionsState.rightIcon}
							style={styles.buttonIcons}
						/>
					}
				</Button>
			)}

			<Dialog
				open={editMode}
				scroll={'paper'}
				maxWidth="md"
				disableEscapeKeyDown
				onClose={(_e, reason) => reason !== 'backdropClick'}
				onClick={(e) => e.stopPropagation()}
				className={classes.container}
			>
				<DialogContent dividers>
					<div
						data-test-id="cms-index-dialog-content"
						style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}
					>
						<Feedback feedback={feedback} setFeedback={setFeedback} />
						{loading ? (
							<LoadingIndicator />
						) : (
							<FormControl component="fieldset" className={classes.form}>
								<TextField
									label="Label"
									required
									variant="outlined"
									value={text}
									onChange={(e) => setText(e.target.value)}
									className={classes.input}
								/>
								<TextField
									label="Link Address"
									required={componentType === 'link'}
									variant="outlined"
									value={href}
									onChange={(e) => setHref(e.target.value)}
									className={classes.input}
								/>
								<RadioButtonSection
									data={linkdata}
									handleChange={linkdispatch}
									radioButtonState={linkstate}
									setComponentType={setComponentType}
									componentType={componentType}
								/>
							</FormControl>
						)}
					</div>
				</DialogContent>

				<DialogActions>
					<Button
						data-test-id="cms-index-cancel-button"
						size="small"
						color="secondary"
						onClick={handleCancelClick}
						variant="contained"
					>
						Cancel
					</Button>
					<Button
						data-test-id="cms-index-save-button"
						size="small"
						color="primary"
						onClick={handleSaveClick}
						variant="contained"
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

const styles = {
	outerContainer: () => ({
		position: 'relative',
		maxWidth: 840,
	}),
	buttonIcons: {
		height: 25,
		width: 25,
	},
	linkIcons: {
		height: 25,
		width: 25,
		position: 'relative',
		marginTop: 7,
		verticalAlign: 'center'
	},
};
