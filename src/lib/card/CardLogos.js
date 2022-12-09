import React from "react";
import { CardMedia } from "@material-ui/core";

/**
 * CardLogos Component - Configurable component that renders the logos for the WebAppTileCard
 * @param {String} logoCenter Center image icon if single, leave undefined if unnecessary
 * @param {String} logoLeft Left side image icon, leave undefined if unnecessary
 * @param {String} logoRight Right side image icon, leave undefined if unnecessary
 * @param {String} logoHeightCenter String height of center icon if different from default, leave undefined if unnecessary
 * @param {String} logoHeightLeft String height of left icon if different from default, leave undefined if unnecessary
 * @param {String} logoHeightRight String height of second icon if different from default, leave undefined if unnecessary
 * @param {Object} logoContainerStyles Style object applied to the wrapping div
 * @param {Object} logoStylesAll Style object applied to all logos which can be overridden with styles for individual logos.
 * @param {Object} logoCenterStyles Center image icon if single, leave undefined if unnecessary
 * @param {Object} logoLeftStyles Style object for left side image icon, leave undefined if unnecessary
 * @param {Object} logoRightStyles Style object for right side image icon, leave undefined if unnecessary
 * @returns CardLogos Component
 */
const CardLogos = ({ 
    logoCenter, 
    logoLeft, 
    logoRight,
    logoHeightCenter,
    logoHeightLeft,
    logoHeightRight,
	logoContainerStyles = {},
    logoStylesAll = {},
    logoCenterStyles = {},
    logoLeftStyles = {},
    logoRightStyles = {},
}) => {
    return(
        <div style={logoContainerStyles || styles.cardmedia}>
			{logoCenter && (
				<div style={styles.logo}>
            		<CardMedia
						component="img"
						height={logoHeightCenter ? logoHeightCenter : 120}
						image={logoCenter}
						alt={logoCenter}
						style={{ ...logoStylesAll, ...logoCenterStyles }}
					/>
				</div>
			)}
			{logoLeft && (
				<div style={styles.logo}>
					<CardMedia
						component="img"
						height={logoHeightLeft ? logoHeightLeft : 120}
						image={logoLeft}
						alt={logoLeft}
						style={{ ...logoStylesAll, ...logoLeftStyles }}
					/>
				</div>
			)}
			{logoRight && (
				<div style={styles.logo}>
					<CardMedia
						component="img"
						height={logoHeightRight ? logoHeightRight : 120}
                    	image={logoRight}
						alt={logoRight}
						style={{ ...logoStylesAll, ...logoRightStyles }}
					/>
				</div>
			)}
		</div>
    );
};

const styles = {
	cardmedia: {
		display: 'flex',
		justifyContent: 'space-around',
		paddingBottom: '18px',
	},
	logo: {
		marginTop: '5px',
		marginBottom: '5px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
};

export default CardLogos