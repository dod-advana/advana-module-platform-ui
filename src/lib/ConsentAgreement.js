import React, { useState } from 'react';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core'

const AGREEMENT_KEY = 'data.mil-consent-agreed';

const getIsOpen = () => {
	let lastAgreement = localStorage.getItem(AGREEMENT_KEY);
	if (!lastAgreement)
		return true;

	try {
		const twoHoursAgo = Date.now() - (1000 * 60 * 60 * 2);
		return new Date(lastAgreement) < twoHoursAgo;

	} catch (err) {
		console.error(err);
		return true;
	}
};

const setAgreementTime = () => localStorage.setItem(AGREEMENT_KEY, (new Date()).toString());

const ConsentAgreement = ({ navigateTo = 'navigate to the Advana App-wide Agreements on the About page' }) => {

	const [isOpen, setIsOpen] = useState(getIsOpen());


	return (
		<Dialog
			open={isOpen}
			maxWidth="md"
			disableBackdropClick={true}
			disableEscapeKeyDown={true}
		>
			<DialogTitle disableTypography>
				<Typography varient="h3">DoD Notice and Consent Banner</Typography>
			</DialogTitle>
			<DialogContent>
				<Typography variant="body2" style={styles.margin}>You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.</Typography>
				<Typography variant="body2" style={styles.margin}>By using this IS (which includes any device attached to this IS), you consent to the following conditions:</Typography>
				<Typography variant="body2" style={styles.margin}>The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.</Typography>
				<Typography variant="body2" style={styles.margin}>At any time, the USG may inspect and seize data stored on this IS.</Typography>
				<Typography variant="body2" style={styles.margin}>Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.</Typography>
				<Typography variant="body2" style={styles.margin}>This IS includes security measures (e.g., authentication and access controls) to protect USG interests—not for your personal benefit or privacy.</Typography>
				<Typography variant="body2" style={styles.margin}>Notwithstanding the above, using this IS does not constitute consent to PM, LE, or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.</Typography>
				<Typography variant="body2" style={styles.margin}>Advana employs a web measurement and customization technology (WMCT), on this site to remember a user's online interactions, to conduct measurement and analysis of usage, or to customize user experience. This WMCT activity is categorized as a Tier 2 WMCT: i.e., multi-session tracking without collection of personally identifiable information (PII), and is enabled by default. Advana does not use the information associated with the WMCT to track individual user activity on the Internet outside of Advana websites, nor does it share the data obtained through such technologies, without your explicit consent, with other departments or agencies. Advana maintains a database of information obtained from the use of this WMCT, in perpetuity, in an encrypted RDS instance, but no personal data is maintained. General instructions for how you may opt out are available at https://www.usa.gov/optout-instructions, however disabling cookies as instructed will inhibit access to Advana. To ensure opting out of this WMCT does not effect a user's access to information, {navigateTo}. </Typography>
				<Typography varient="h3" style={styles.margin}>Agency Disclosure Notice</Typography>
				<Typography variant="body2" style={styles.margin}>OMB CONTROL NUMBER: 0704-0553</Typography>
				<Typography variant="body2" style={styles.margin}>OMB EXPIRATION DATE: 03/31/2022</Typography>
				<Typography variant="body2" style={styles.margin}>The public reporting burden for this collection of information, 0704-0553, is estimated to average 30 seconds per response, including the time for reviewing instructions, searching existing data sources, gathering and maintaining the data needed, and completing and reviewing the collection of information. Send comments regarding the burden estimate or burden reduction suggestions to the Department of Defense, Washington Headquarters Services, at whs.mc-alex.esd.mbx.dd-dod-information-collections@mail.mil. Respondents should be aware that notwithstanding any other provision of law, no person shall be subject to any penalty for failing to comply with a collection of information if it does not display a currently valid OMB control number.</Typography>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						setAgreementTime();
						setIsOpen(false);
					}}
					variant="contained"
					color="primary"
					size="small"
				>
					OK
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const styles = {
	margin: {
		marginBottom: 15
	}
}

export default ConsentAgreement;
