import React, { useState, useEffect, useCallback } from 'react';
import _ from 'underscore';
import ReactMarkdown from 'react-markdown';
import { Button } from '@material-ui/core';

import * as CMS_API from './utilities/contentManagementAPI.js';
import * as permissions from './utilities/permission.js';

import LoadingIndicator from '../loading/LoadingIndicator';

import './content-management.css';

const styles = {
	textArea: {
		color: '#3F4A56',
		fontFamily: '"Courier New", Courier, monospace',
		width: '100%',
		height: '70vh',
		border: '1px solid #cccccc',
		borderRadius: '4px',
	},
	input: {
		width: '100%',
		marginBottom: 15,
		border: '1px solid #cccccc',
		padding: '5px 10px',
		borderRadius: '4px',
	},
	select: {
		marginBottom: 15,
		width: '100%',
	},
	disabled: {
		backgroundColor: '#e6e6e6',
		color: 'grey',
		borderColor: '#f2f2f2',
	},
	floatingEditButton: {
		position: 'absolute',
		left: '-30px',
		top: -4,
		fontSize: '30px',
		color: 'blue',
		cursor: 'pointer',
	},
	buttonBar: {
		display: 'flex',
		border: '1px solid grey',
		borderBottom: 0,
	},
	buttonBarButton: {
		marginRight: 5,
	},
};

export const EditButton = ({ handleClick }) => (
	<div
		style={styles.floatingEditButton}
		onClick={handleClick}
		data-test-id="edit-button"
	>
		<i className="fa fa-pencil" aria-hidden="true" alt=""></i>
	</div>
);

/**
 * Content Management Section
 * @component
 * @desc Used for wrapping text sections to be modifiable after development. Allows for post-dev content management.
 */
const ContentManagementSection = (props) => {
	const { page, section, externalsNewTab, style, className } = props;

	ContentManagementSection.defaultProps = {
		disableEdit: false,
		page: '',
		section: null,
		externalsNewTab: false,
		style: {},
	};

	const [markdown, setMarkdown] = useState('');
	const [editMarkdown, setEditMarkdown] = useState('');
	const [htmlMode, setHtmlMode] = useState(true);
	const [loading, setLoading] = useState(false);
	const [hasPermissionToEdit, setHasPermissionToEdit] = useState(false);

	const getCmsID = useCallback(() => `${page}_${section}`, [page, section]);

	const adjustExternalLinksOpenNewTab = useCallback(() => {
		const links = document.getElementById(getCmsID()).getElementsByTagName('a');

		for (let i = 0, linksLength = links.length; i < linksLength; i++) {
			if (links[i].hostname !== window.location.hostname) {
				links[i].target = '_blank';
			}
		}
	}, [getCmsID]);

	const getMarkdownByPageAndSection = useCallback(() => {
		setLoading(true);
		CMS_API.contentManagementGET(page, section, (resp) => {
			if (resp.data && !_.isEmpty(resp.data)) {
				setLoading(false);
				setMarkdown(resp.data.markdown);
				setEditMarkdown(resp.data.markdown);
			} else setLoading(false);
			if (externalsNewTab) adjustExternalLinksOpenNewTab();
		});
	}, [adjustExternalLinksOpenNewTab, externalsNewTab, page, section]);

	useEffect(() => {
		setHasPermissionToEdit(permissions.allowEditCMS(page));
		getMarkdownByPageAndSection();
	}, [page, getMarkdownByPageAndSection]);

	const setMarkdownByPageAndSection = () => {
		let markDown = editMarkdown;
		CMS_API.contentManagementPOST(
			{ page, section, markdown: markDown },
			(_resp) => {
				setMarkdown(editMarkdown);
				setHtmlMode(true);
			}
		);
	};

	const onEditMarkdownChange = (e) => {
		setEditMarkdown(e.target.value);
	};
	const disableEditButtons = editMarkdown === markdown;
	const isEmpty = _.isEmpty(editMarkdown);
	const emptyCompensation = isEmpty ? { minHeight: 10 } : {};
	const renderedHtml = loading ? (
		<LoadingIndicator />
	) : (
		<ReactMarkdown children={editMarkdown}/>
	);

	let classes = 'content-management'
	if(className !== undefined){
		classes = classes + ' ' + className;
	}

	return (
		<div
			style={{ position: 'relative', ...emptyCompensation }}
			data-test-id="content-management-section"
		>
			{htmlMode && hasPermissionToEdit && (
				<EditButton
					handleClick={() => {
						setHtmlMode(!htmlMode);
					}}
				/>
			)}
			<div id={getCmsID()} className={classes} style={{...style}}>
				{!htmlMode ? (
					<div>
						<div style={styles.buttonBar}>
							<Button
								data-test-id="content-management-section-save"
								color="primary"
								variant="contained"
								style={styles.buttonBarButton}
								disabled={disableEditButtons}
								onClick={() => setMarkdownByPageAndSection()}
							>
								Save
							</Button>
							<Button
								data-test-id="content-management-section-discard-changes"
								color="secondary"
								variant="contained"
								style={styles.buttonBarButton}
								disabled={disableEditButtons}
								onClick={() => {
									setEditMarkdown(markdown);
									setHtmlMode(true);
								}}
							>
								Discard Changes
							</Button>
							<Button
								data-test-id="content-management-section-preview-changes"
								color="secondary"
								variant="contained"
								style={styles.buttonBarButton}
								onClick={() => {
									setHtmlMode(true);
								}}
							>
								Preview Changes
							</Button>
						</div>
						<textarea
							onChange={onEditMarkdownChange}
							style={styles.textArea}
							value={editMarkdown}
						/>
					</div>
				) : (
					renderedHtml
				)}
			</div>
		</div>
	);
};

export default ContentManagementSection;
