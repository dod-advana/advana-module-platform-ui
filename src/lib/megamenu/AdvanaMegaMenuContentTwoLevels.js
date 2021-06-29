import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import _ from 'underscore';
import PrimarySectionLinks from './PrimarySectionLinks';
import SecondarySectionLinks from './SecondarySectionLinks';

import { styles, MenuTitle, MenuDescription } from './AdvanaMegaMenuStyleElements';

export default function AdvanaMegaMenuContent({
	data={},
	redirect
}) {
	const [activePrimarySection, setActivePrimarySection] = useState(null);

	const [secondaryLinks, setSecondaryLinks] = useState([]);

	useEffect(() => {
		if (activePrimarySection) {
			const secondaryLinksLookup = _.find(data?.links, ({ label }) => label === activePrimarySection);
			setSecondaryLinks(secondaryLinksLookup);
		}
	}, [activePrimarySection, data]);

	return <div style={styles.container}>
		<div className="col-xs-3 mega-menu-scrollbar" style={styles.column1}>
			<MenuTitle>{data.title}</MenuTitle>
			<MenuDescription>{data.description}</MenuDescription>
			<Button variant={'contained'}
				color="primary"
				size={'large'}
				style={{ marginTop: 20 }}
				onClick={() => redirect(data?.link ?? '#')}
			>
				View Page
			</Button>
		</div>
		<div className="col-xs-3 mega-menu-scrollbar" style={styles.columnStyles}>
			<PrimarySectionLinks links={data.links} activePrimarySection={activePrimarySection} setActivePrimarySection={setActivePrimarySection} redirect={redirect} />
		</div>
		<div className="col-xs-4 mega-menu-scrollbar" style={styles.columnStyles}>
			<SecondarySectionLinks links={secondaryLinks?.links} tertiary={true} redirect={redirect} />
		</div>
	</div>
}