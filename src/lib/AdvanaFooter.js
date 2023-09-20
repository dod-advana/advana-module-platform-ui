import React, { useState } from 'react';
import { Button, Modal, styled } from '@mui/material';
import { changePage, getDynamicHeaderButtons, useMegaMenuLinks } from "./utilities/sitemap";
import CDAOLogo from './images/logos/cdao_logo.png';

const StyledModal = styled(Modal, {
	shouldForwardProp: (props) => props !== 'offset'
})(({ offset }) => ({
	marginTop: '2em', // adjusting for classification banner
	paddingTop: offset, // adjust for additional banners
}));

const FooterContainer = styled('div')({
	display: 'flex',
	height: 90,
	width: '100%',
	alignItems: 'center',
	justifyContent: 'flex-end',
	backgroundColor: 'black',
	color: 'white',
});

const LinkButton = styled(Button)({
	'&&': {
		backgroundColor: 'transparent',
		fontWeight: 600,
		borderBottom: '3px solid transparent',
		color: 'white',
		height: '3em',
		fontFamily: 'Montserrat',
		paddingLeft: 10,
	},
});

const Spacer = styled('div')({
	flex: 1,
});

const LinkContainer = styled('div')({
	display: 'flex',
	flex: 25,
	justifyContent: 'flex-end',
});

const DisclaimerModal = styled('div')({
	width: '50%',
	backgroundColor: 'white',
	padding: 20,
	borderRadius: 5,
	margin: '5% auto',
	height: '71%',
	overflow: 'scroll',
});

const ButtonRow = styled('div')({
	display: 'flex',
	justifyContent: 'flex-end',
	margin: '10 0 0 0',
});

const LogosSection = styled('div')({
	paddingLeft: 50,
	display: 'flex',
	'& img': {
		width: 140,
	},
});

const AdvanaFooter = ({ extraLinks, offset }) => {
	let links = useMegaMenuLinks();
	const headerButtons = getDynamicHeaderButtons(links);

	links = headerButtons.map((button) => (
		<LinkButton key={button.value} onClick={() => changePage(button.link)}>{button.label}</LinkButton>
	))

	const [disclaimerModalOpen, setDisclaimerModalOpen] = useState(false);

	return (
		<FooterContainer data-test-id="footer">
			<LogosSection>
				<img
					src={CDAOLogo}
					style={{ marginLeft: 32, marginRight: 20 }}
					alt="cdao-logo"
					id={'cdaoLogo'}
				/>
			</LogosSection>
			<LinkContainer>
				{links}
				{extraLinks}
				<LinkButton key='disclaimer' onClick={() => setDisclaimerModalOpen(true)}>Disclaimer</LinkButton>
			</LinkContainer>
			<Spacer />
			<StyledModal
				open={disclaimerModalOpen}
				onClose={() => setDisclaimerModalOpen(false)}
				offset={offset}
			>
				<DisclaimerModal>
					<div>
						<p>You are accessing a U.S. Government (USG) Information System (IS) that is provided for USG-authorized use only.</p>
						<p>By using this IS (which includes any device attached to this IS), you consent to the following conditions:</p>
						<p>The USG routinely intercepts and monitors communications on this IS for purposes including, but not limited to, penetration testing, COMSEC monitoring, network operations and defense, personnel misconduct (PM), law enforcement (LE), and counterintelligence (CI) investigations.</p>
						<p>At any time, the USG may inspect and seize data stored on this IS.</p>
						<p>Communications using, or data stored on, this IS are not private, are subject to routine monitoring, interception, and search, and may be disclosed or used for any USG-authorized purpose.</p>
						<p>This IS includes security measures (e.g., authentication and access controls) to protect USG interests—not for your personal benefit or privacy.</p>
						<p>Notwithstanding the above, using this IS does not constitute consent to PM, LE, or CI investigative searching or monitoring of the content of privileged communications, or work product, related to personal representation or services by attorneys, psychotherapists, or clergy, and their assistants. Such communications and work product are private and confidential. See User Agreement for details.</p>
						<p>Advana employs a web measurement and customization technology (WMCT), on this site to remember a user's online interactions, to conduct measurement and analysis of usage, or to customize user experience. This WMCT activity is categorized as a Tier 2 WMCT: i.e., multi-session tracking without collection of personally identifiable information (PII), and is enabled by default. Advana does not use the information associated with the WMCT to track individual user activity on the Internet outside of Advana websites, nor does it share the data obtained through such technologies, without your explicit consent, with other departments or agencies. Advana maintains a database of information obtained from the use of this WMCT, in perpetuity, in an encrypted RDS instance, but no personal data is maintained. General instructions for how you may opt out are available at https://www.usa.gov/optout-instructions, however disabling cookies as instructed will inhibit access to Advana. To ensure opting out of this WMCT does not effect a user's access to information, navigate to the Advana App-wide Agreements on the About page.</p>
					</div>
					<ButtonRow>
						<Button variant="contained" onClick={() => setDisclaimerModalOpen(false)}>Close</Button>
					</ButtonRow>
				</DisclaimerModal>
			</StyledModal>
		</FooterContainer>
	);
}

export default AdvanaFooter;