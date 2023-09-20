import React from 'react';
import AdvanaMegaMenuPill from './megamenu/AdvanaMegaMenuPill';
import AdvanaMegaMenuPillMinimal from './megamenu/AdvanaMegaMenuPillMinimal';

import Config from './config/config';

const styles = {
	pageTitleRow: {
		padding: '20px',
		width: '100%',
		display: 'inline-flex',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(223,230,238,0.5)',
		height: 100
	},
	logo: {
		height: 70
	},
	beta: {
		backgroundColor: 'red',
		borderRadius: '13px',
		padding: '0px 20px',
		color: 'white',
		fontFamily: 'Montserrat',
		fontWeight: 'bold',
		margin: 'auto 0px 10px',
		fontSize: 14
	}
};

const ToolPageTitle = ({ logo, alt, beta, unread, extraPillClass = '', showProfileLink = true, offset, minimalPill = false }) => {
	return (
		<div style={styles.pageTitleRow}>
			<div style={{ display: 'inline-flex' }}>
				{logo && <img src={logo} alt={alt} style={styles.logo} />}
				{beta && <div style={styles.beta}>Beta</div>}
			</div>
			<div style={{ paddingTop: 10 }} className={extraPillClass}>
				{ minimalPill ? 
					<AdvanaMegaMenuPillMinimal contained />
					: <AdvanaMegaMenuPill unread={unread} margin={'auto 0px'} showProfileLink={showProfileLink} headerOffset={offset} 				/>
				}
			</div>
		</div>

	);
};

export default ToolPageTitle;
