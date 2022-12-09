import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ButtonLinkCMS from './ButtonLinkCMS';

import ContentManagementSection from './ContentManagementSection';

const CMSCallToActionCards = (props) => {
	const {
		cmsKey,
		img,
		newTab = false,
		inDevelopment,
		page = 'CallToActionCards',
	} = props;
	const target = newTab ? '_blank' : '_self';

	const classes = useStyles();

	return (
		<div style={styles.card} data-test-id={cmsKey?.toLowerCase().replaceAll(' ', '-')}>
			<div style={styles.title}>
				<ContentManagementSection
					page={page}
					section={cmsKey + '-title'}
					className="call-to-action-title"
				/>
			</div>
			<div style={styles.body} data-test-id="cms-call-to-actions-cards-body">
				{img && (
					<img src={img} alt={cmsKey + ' image sliver'} style={styles.img} />
				)}
				<ContentManagementSection
					page={page}
					section={cmsKey + '-body'}
					className="call-to-action-body"
				/>
			</div>
			<div style={styles.footer} data-test-id="cms-call-to-actions-cards-footer">
				{inDevelopment ? (
					<Chip label={'In Development'} classes={{ root: classes.chip }} />
				) : (
					<ButtonLinkCMS
						page={page}
						buttonName={`${cmsKey}-link`}
						buttonStyles={styles.link}
						containerStyles={{
							textItems: 'right',
							verticalAlign: 'middle', 
							justifyContent: 'end',
						}}
						iconStyles={styles.icon}
						hrefTarget={target}
						linkStyles={{ 
							height: '100%', 
							verticalAlign: 'middle', 
							justifyContent: 'center', 
							display: 'inline-flex', 
						}}
						linkTextStyles={{
							verticalAlign: 'middle', 
							justifyContent: 'center',
							marginTop: '5px'	
						}}
					/>
				)}
			</div>
		</div>
	);
};

const useStyles = makeStyles(() => ({
	chip: {
		fontSize: 16,
		height: 35,
		borderRadius: 20,
		color: '#ffffff',
		margin: 'auto 0px auto auto',
		backgroundColor: '#d3d3d3',
	},
}));

const styles = {
	title: {
		backgroundColor: '#f2f5f9',
		border: '1px solid #B0BAC5',
		borderRadius: '4px 4px 0 0',
		borderBottom: '1px solid #B0BAC5',
		height: 70,
		padding: '20px 25px',
	},
	body: {
		borderLeft: '1px solid #B0BAC5',
		borderRight: '1px solid #B0BAC5',
		padding: 25,
		height: 330,
		backgroundColor: '#FFFFFF',
	},
	img: {
		width: '100%',
		marginBottom: 10,
	},
	footer: {
		border: '1px solid #B0BAC5',
		borderTop: '1px solid #E1E8EE',
		padding: 8,
		borderRadius: '0 0 4px 4px ',
		height: 50,
		display: 'flex',
		backgroundColor: '#FFFFFF',
		justifyContent: 'end',
	},
	link: {
		margin: 'auto 0px auto auto',
		fontSize: 16,
		fontFamily: 'Noto Sans',
		fontWeight: '600',
		color: '#009490',
		justifyContent: 'end',
	},
	icon: {
		fontSize: 19,
		marginTop: '8px',
	},
	inDev: {},
};

export default CMSCallToActionCards;
