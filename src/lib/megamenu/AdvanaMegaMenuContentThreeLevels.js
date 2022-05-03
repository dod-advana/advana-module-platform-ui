import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import _ from 'underscore';
import PrimarySectionLinks from './PrimarySectionLinks';
import SecondarySectionLinks from './SecondarySectionLinks';

import { styles, MenuTitle, MenuDescription } from './AdvanaMegaMenuStyleElements';
import Config from "../config/config";

export default function AdvanaMegaMenuContent({
	data={},
	header,
	redirect
}) {
	const [activePrimarySection, setActivePrimarySection] = useState(null);
	const [activeSecondarySection, setActiveSecondarySection] = useState(null);

	const [secondaryLinks, setSecondaryLinks] = useState([]);
	const [tertiaryLinks, setTertiaryLinks] = useState([]);

	useEffect(() => {
		if (activePrimarySection) {
			const secondaryLinksLookup = _.find(data?.links, ({ label }) => label === activePrimarySection);
			setSecondaryLinks(secondaryLinksLookup);
			if (activeSecondarySection) {
				const tertiaryLinksLookup = _.find(secondaryLinksLookup?.links, ({ label }) => label === activeSecondarySection);
				setTertiaryLinks(tertiaryLinksLookup);
			}
		}
	}, [activePrimarySection, activeSecondarySection, data]);

	return <div style={styles.container}>
		<div className="col-xs-3 mega-menu-scrollbar" style={styles.column1}>
			<MenuTitle>{data.title}</MenuTitle>
			<MenuDescription>{data.description}</MenuDescription>
			<Button variant={'contained'}
				color="primary"
				size={'large'}
				style={{ marginTop: 20, backgroundColor: Config.MEGA_MENU_HIGHLIGHT_COLOR }}
				onClick={() => redirect(data?.link ?? '#', data?.newTab)}
			>
				View Page
			</Button>
		</div>
		<div className="col-xs-3 mega-menu-scrollbar" style={styles.columnStyles}>
			<PrimarySectionLinks links={data.links} activePrimarySection={activePrimarySection} setActivePrimarySection={setActivePrimarySection} redirect={redirect} />
		</div>
		<div className="col-xs-3 mega-menu-scrollbar" style={activePrimarySection ? styles.column3 : styles.columnStyles}>
			<SecondarySectionLinks links={secondaryLinks?.links} activeSecondarySection={activeSecondarySection} setActiveSecondarySection={setActiveSecondarySection} redirect={redirect} />
		</div>
		<div className="col-xs-3 mega-menu-scrollbar" style={styles.columnStyles}>
			<SecondarySectionLinks links={tertiaryLinks?.links} tertiary={true} redirect={redirect} />
		</div>
	</div>
}
