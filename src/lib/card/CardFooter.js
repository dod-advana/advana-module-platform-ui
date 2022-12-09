import React from "react";
import { CardActions, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/**
 * CardFooter Component - Configurable component that renders the footer for the WebAppTileCard
 * @param {Object} footerContainerStyles Style object for the container wrapping both buttons
 * @param {String} primaryButtonText String value for setting name of primary button
 * @param {String} primaryButtonHref String value for setting href of primary button
 * @param {Function} primaryButtonOnClick Function for when the primary button is clicked
 * @param {Object} primaryButtonStyles Style object for primary button (second from right on bottom)
 * @param {Object} primaryButtonOtherProps Props object passed to primary button (second from right on bottom)
 * @param {Boolean} primaryButtonDisabled Defines if the primary button is disabled
 * @param {String} secondaryButtonText String value for setting name of info button
 * @param {String} secondaryButtonHref String value for setting href of info button
 * @param {Function} secondaryButtonOnClick Function for when the secondary button is clicked
 * @param {Object} secondaryButtonStyles Style object for info button (first from right on bottom)
 * @param {Object} secondaryButtonOtherProps props object passed to info button (first from right on bottom)
 * @param {Boolean} secondaryButtonDisabled Defines if the secondary button is disabled
 * @returns CardFooter Component
 */
const CardFooter = ({ 
    footerContainerStyles = {},
    primaryButtonText, 
    primaryButtonHref,
    primaryButtonOnClick,
    primaryButtonStyles = {},
    primaryButtonOtherProps = {},
    primaryButtonDisabled = false,
    secondaryButtonText,
    secondaryButtonHref,
    secondaryButtonOnClick,
    secondaryButtonStyles = {},
    secondaryButtonOtherProps = {},
    secondaryButtonDisabled = false
}) => {

    // makeStyles helps override theme styles
    const useStyles = makeStyles({
		primaryButton: primaryButtonStyles,
		infoButton: secondaryButtonStyles
	});

	const classes = useStyles();

    return(
        <>
            {primaryButtonText || secondaryButtonText ? (
                <CardActions disableSpacing style={footerContainerStyles || styles.display}>
                    {(primaryButtonText || primaryButtonHref) ? (
                        <Button
                            {...primaryButtonOtherProps}
                            variant="contained"
                            color="primary"
                            target="_blank"
                            onClick={primaryButtonOnClick}
                            className={classes.primaryButton}
                            aria-label={primaryButtonText}
                            href={primaryButtonHref}
                            disabled={primaryButtonDisabled}
                        >
                            {primaryButtonText}
                        </Button>
                    ) : null}
                    {(secondaryButtonText || secondaryButtonHref) ? (
                        <Button
                            {...secondaryButtonOtherProps}
                            type="submit"
                            color="secondary"
                            variant="text"
                            className={classes.infoButton}
                            style={{ marginLeft: '10%' }}
                            onClick={secondaryButtonOnClick}
                            href={secondaryButtonHref}
                            disabled={secondaryButtonDisabled}
                        >
                            <span style={styles.infoText}>{secondaryButtonText}</span>
                            <ExpandMoreIcon style={styles.expandMoreIcon} aria-label={secondaryButtonText} />
                        </Button>
                    ) : null}
                </CardActions>
            ) : null}
        </>
    );
}

const styles = {
    infoText: {
		position: 'relative',
		bottom: '-1px',
	},
	expandMoreIcon: {
		transform: 'rotate(-90deg)',
	},
}

export default CardFooter;