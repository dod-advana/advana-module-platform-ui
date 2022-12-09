import React from "react";
import { CardHeader, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CropSquareIcon from '@material-ui/icons/CropSquare';
import FavoriteIcon from './FavoriteIcon';

/**
 * CardTitle Component - Configurable component for rendering the title for the WebAppTileCard
 * @param {String} title String value for setting the card title
 * @param {Function} settingsOnClick Function to handle clicking on square icon (top right corner)
 * @param {Boolean} isFavorite changes favorite icon to indicate if saved as a favorite by current user.
 * @param {Function} favoriteOnClick Function to handle clicking on star icon (top right corner)
 * @param {String} titleStyles CSS value for overwriting the title styles
 * @param {String} titleHeight CSS value for setting height of card title, leave undefined if unnecessary
 * @param {String} titleBackgroundColor CSS value for setting background color of card title, leave undefined if unnecessary
 * @param {String} titleColor CSS value for setting the title color
 * @returns CardTitle Component
 */
const CardTitle = ({ 
    title,
    settingsOnClick,
    isFavorite, 
    favoriteOnClick,
    titleStyles = {},
    titleHeight,
    titleBackgroundColor,
    titleColor
}) => {

    const useStyles = makeStyles({
		action: { display: 'flex', alignItems: 'center' },
	});

	const classes = useStyles();

    titleStyles = Object.keys(titleStyles).length !== 0 ? titleStyles : styles.header(titleHeight, titleBackgroundColor, titleColor)

    return(
        <CardHeader
			disableTypography
			action={
				<div className={classes.action}>
					{settingsOnClick ? (
						<IconButton
							style={styles.iconbutton}
							aria-label="settings"
							onClick={settingsOnClick}
						>
							<CropSquareIcon style={styles.action} />
						</IconButton>
					) : null}
					{favoriteOnClick ? (
						<button onClick={favoriteOnClick} style={styles.favoriteButton}>
							<FavoriteIcon isFavorite={isFavorite} />
						</button>
					) : null}
				</div>
			}
			title={<span>{title?.toUpperCase()}</span>}
			style={titleStyles}
		/>
    );
};

const backgroundWhite = '#FFFFFF'; // white

const styles = {
	iconbutton: {
		padding: '4px',
	},
	action: {
		color: backgroundWhite,
	},
	favoriteButton: {
		display: 'flex',
		justifyContent: 'center',
		maxWidth: 40,
		minWidth: 40,
		height: 40,
		cursor: 'pointer',
		border: 'none',
		background: 'transparent',
	},
    header: (titleHeight, titleBackgroundColor, titleColor) => ({
		height: titleHeight ? titleHeight : '82px',
		backgroundColor: titleBackgroundColor,
		display: '-webkit-box',
		WebkitBoxOrient: 'vertical',
		WebkitLineClamp: '3',
		overflow: 'hidden',
		marginBottom: '8px',
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		color: titleColor ? titleColor : backgroundWhite,
		fontSize: '16px',
		letterSpacing: '0.51px',
		lineHeight: '21px',
		width: '268px',
		paddingTop: '5px',
	})
};

export default CardTitle;