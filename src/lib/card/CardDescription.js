import React, { useEffect, useState } from 'react';
import { CardContent } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * CardDescription Component - Configurable component that renders the description section of the WebAppTileCard
 * @param {ReactNode} description String value for card description value
 * @param {String} descriptionId String value id for the web app card description to check if a popover is necessary when the description has an ellipsis
 * @param {Object} cardDescriptionStyle Styling object that wraps the description section
 * @param {Boolean} popOver Determines if the popOver should appear as a tooltip because the card description is too long
 * @returns CardDescription Component
 */
const CardDescription = ({
	description, 
	descriptionId, 
	cardDescriptionStyle = {},
}) => {

	// this state is for the popover that appears over the description in the web app acrd if the description is too long (text gets cut off with an ellipsis)
	const [popOver, setPopOver] = useState(false);

	useEffect(() => {
		// check if a description id is passed then check to see if the description of the web app card has an elipsis
		if (descriptionId) {
			const paragraphDescription = document.getElementById(descriptionId);
			isEllipsisActive(paragraphDescription);
		}
	}, [descriptionId]);

	// check if the web app card description has an ellipsis and if it is set the popover state to true
	const isEllipsisActive = (element) => {
		if (element.scrollHeight > element.clientHeight)
			setPopOver(true);
	}

	cardDescriptionStyle = Object.keys(cardDescriptionStyle).length !== 0 ? cardDescriptionStyle : { backgroundColor: 'white' }

	const renderedDescription = typeof(description) ===  "string" ? (
		<p id={descriptionId ? descriptionId : ''} variant="body2" style={styles.description}>
			{description}
		</p>
	) : description;

    return(
		<>
        {description ? 
			<CardContent style={cardDescriptionStyle}>
            	{popOver ? <Tooltip title={description} arrow>
                	{renderedDescription}
        	    </Tooltip> : renderedDescription}
        	</CardContent> 
		: null}
		</>
    );
};

const styles = {
    description: {
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: '4',
		overflow: 'hidden',
		width: '85%',
		fontSize: '0.97rem',
		color: '#3A3A3A',
		marginBottom: '4px',
		lineHeight: '25px',
		height: 100,
	}
}

export default CardDescription;