import React from 'react';
import { Card } from '@material-ui/core';

import CardDescription from './CardDescription';
import CardLogos from './CardLogos';
import CardFooter from './CardFooter';
import CardTitle from './CardTitle';

/**
 * WebAppTileCard Component - Configurable component that allows setting values to create standardized web app card
 * @param {Object} titleProps Contains all the props to be passed to the card title
 * @param {Object} logoProps Contains all the props to be passed to the card logos
 * @param {Object} descriptionProps Contains all the props to be passed to the card description
 * @param {Object} footerProps Conatins all the props to be  passed to the card footer
 * @param {String} background CSS background image input, allows inputing a gradient, image, or color. for example: "linear-gradient(#011D28, #26586B, #2F738C, #247D9E, #016E96)"
 * @param {Boolean} noLogo determines if the logo should be rendered
 * @param {String} descriptionId String value id for the web app card description to check if a popover is necessary when the description has an ellipsis
 * @param {Object} cardStyle Style object applied to card object.
 * @param {Object} cardHeaderStyle Style object applied to the wrapper around the title and logos
 * @returns WebAppTileCard Component
 */
export default function WebAppTileCard({
	titleProps,
	logoProps,
	descriptionProps,
	footerProps,
	background,
	noLogo,
	cardStyle={},
	cardHeaderStyle = {},
}) {

	return (
		<Card sx={{ maxWidth: 363 }} style={{ background: background, ...cardStyle }}>
			<div style={{ ...cardHeaderStyle }}>
				<CardTitle {...titleProps}/>
				{!noLogo && <CardLogos 
    				{...logoProps}
				/>}
			</div>
			<CardDescription 
				{...descriptionProps}
			/>
			<CardFooter {...footerProps} />
		</Card>
	);
};