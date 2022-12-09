import * as React from 'react';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

const AGREEMENT_KEY = 'data.mil-consent-agreed';

const MyDialog = styled((props) => <Dialog {...props} />)`
	bottom: 100px;

	.MuiTypography-root {
		margin-bottom: 15px;
	}
`;

const getIsOpen = () => {
	const cookieMap = {};
	const cookies = document.cookie.split(';');
	cookies.forEach((cookie) => {
		const splitCookie = cookie.split('=');
		cookieMap[splitCookie[0].trim()] = splitCookie[1];
	});
	if (!Object.keys(cookieMap).includes(AGREEMENT_KEY)) return true;

	try {
		const twoHoursAgo = Date.now() - 1000 * 60 * 60 * 2;
		return new Date(cookieMap[AGREEMENT_KEY]) < twoHoursAgo;
	} catch (err) {
		console.error(err);
		return true;
	}
};

const setAgreementTime = (cookieDomain = 'localhost') => {
	const futureDate = new Date();
	futureDate.setUTCDate(futureDate.getUTCDate() + 2);
	document.cookie = `${AGREEMENT_KEY}=${new Date().toString()};domain=${cookieDomain};expires=${futureDate.toString()}`;
};

const ConsentAgreement = ({ navigateTo = 'navigate to the Advana App-wide Agreements on the About page' }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		setIsOpen(getIsOpen());
	}, []);

	return (
		<MyDialog open={isOpen} maxWidth="md" disableBackdropClick={true} disableEscapeKeyDown={true}>
			<DialogTitle disableTypography>
				<Typography varient="h3">DoD Notice and Consent Banner</Typography>
			</DialogTitle>
			<DialogContent>
				<Typography variant="body2">
					You are accessing a U.S. Government (USG) Information System (IS) that is provided for
					USG-authorized use only.
				</Typography>
				<Typography variant="body2">
					By using this IS (which includes any device attached to this IS), you consent to the following
					conditions:
				</Typography>
				<Typography variant="body2">
					The USG routinely intercepts and monitors communications on this IS for purposes including, but not
					limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel
					misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.
				</Typography>
				<Typography variant="body2">
					At any time, the USG may inspect and seize data stored on this IS.
				</Typography>
				<Typography variant="body2">
					Communications using, or data stored on, this IS are not private, are subject to routine monitoring,
					interception, and search, and may be disclosed or used for any USG-authorized purpose.
				</Typography>
				<Typography variant="body2">
					This IS includes security measures (e.g., authentication and access controls) to protect USG
					interests—not for your personal benefit or privacy.
				</Typography>
				<Typography variant="body2">
					Notwithstanding the above, using this IS does not constitute consent to PM, LE, or CI investigative
					searching or monitoring of the content of privileged communications, or work product, related to
					personal representation or services by attorneys, psychotherapists, or clergy, and their assistants.
					Such communications and work product are private and confidential. See User Agreement for details.
				</Typography>
				<Typography variant="body2">
					Advana employs a web measurement and customization technology (WMCT), on this site to remember a
					user&apos;s online interactions, to conduct measurement and analysis of usage, or to customize user
					experience. This WMCT activity is categorized as a Tier 2 WMCT: i.e., multi-session tracking without
					collection of personally identifiable information (PII), and is enabled by default. Advana does not
					use the information associated with the WMCT to track individual user activity on the Internet
					outside of Advana websites, nor does it share the data obtained through such technologies, without
					your explicit consent, with other departments or agencies. Advana maintains a database of
					information obtained from the use of this WMCT, in perpetuity, in an encrypted RDS instance, but no
					personal data is maintained. General instructions for how you may opt out are available at
					https://www.usa.gov/optout-instructions, however disabling cookies as instructed will inhibit access
					to Advana. To ensure opting out of this WMCT does not effect a user&apos;s access to information,{' '}
					{navigateTo}.{' '}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						setAgreementTime(process.env.NEXT_PUBLIC_COOKIE_DOMAIN);
						setIsOpen(false);
					}}
					variant="contained"
					color="primary"
					size="small"
				>
					OK
				</Button>
			</DialogActions>
		</MyDialog>
	);
};

export default ConsentAgreement;
