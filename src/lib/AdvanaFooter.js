import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Modal } from '@material-ui/core';

const FooterContainer = styled.div`
	display: flex;
	height: 90px;
	width: 100%;
	align-items: center;
	justify-content: flex-end;
	background-color: black;
	color: white;
`;

const LinkButton = styled(Button)`
	padding: 6px 8px;
	&& {
		background-color: transparent;
		font-weight: 600;
		border-bottom: 3px solid transparent;
		color: white;
		height: 3em;
		font-family: Montserrat;
	};
`;

const Spacer = styled.div`
	flex: 1;
`;

const LinkContainer = styled.div`
	display: flex;
	flex: 25;
	justify-content: flex-end;
`;

const DisclaimerModal = styled.div`
	width: 50%;
	background-color: white;
	padding: 20px;
	border-radius: 5px;
	margin: 5% auto;
`;

const ButtonRow = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 10px 0 0 0;
`;

const HEADER_BUTTONS = [
	{ value: 'whoWeAre', label: 'About', link: '/landing/about' },
	{ value: 'analytics', label: 'Analytics', link: '/landing/analytics' },
	{ value: 'dataTools', label: 'Tools', link: '/landing/data-tools' },
	{ value: 'communities', label: 'Communities', link: '/landing/communities/all' },
	{ value: 'allApplications', label: 'All Applications', link: '/landing/all' },
	{ value: 'support', label: 'Support', link: '/landing/support' },
];

export default () => {

	const history = useHistory();

	const links = HEADER_BUTTONS.map((button)=> (
		<LinkButton key={button.value} onClick={() => history.push(button.link)}>{button.label}</LinkButton>
	))
	
	const [disclaimerModalOpen, setDisclaimerModalOpen] = useState(false);

	return(
		<FooterContainer>
			<LinkContainer>
				{links}
				<LinkButton key='disclaimer' onClick={() => setDisclaimerModalOpen(true)}>Disclaimer</LinkButton>
			</LinkContainer>
			<Spacer />
			<Modal
				open={disclaimerModalOpen}
				onClose={() => setDisclaimerModalOpen(false)}
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
			</Modal>
		</FooterContainer>
	);
}
