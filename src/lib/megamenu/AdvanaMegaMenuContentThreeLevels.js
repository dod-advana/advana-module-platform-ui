import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import PrimarySectionLinks from './PrimarySectionLinks';
import SecondarySectionLinks from './SecondarySectionLinks';

import { MenuContentPanel, MenuInfoPanel } from './AdvanaMegaMenuStyleElements';
import Config from "../config/config";

export default function AdvanaMegaMenuContent({
	data={},
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

	return <>
		<MenuInfoPanel
			title={data.title}
			description={data.description}
			buttonBackgroundColor={Config.MEGA_MENU_HIGHLIGHT_COLOR}
			buttonOnClick={() => redirect(data?.link ?? '#', data?.newTab)}
		/>
		<MenuContentPanel>
			<PrimarySectionLinks links={data.links} activePrimarySection={activePrimarySection} setActivePrimarySection={setActivePrimarySection} redirect={redirect} />
		</MenuContentPanel>
		<MenuContentPanel style={activePrimarySection ? {borderRight: '1px solid white'} : {}}>
			<SecondarySectionLinks links={secondaryLinks?.links} activeSecondarySection={activeSecondarySection} setActiveSecondarySection={setActiveSecondarySection} redirect={redirect} />
		</MenuContentPanel>
		<MenuContentPanel>
			<SecondarySectionLinks links={tertiaryLinks?.links} tertiary={true} redirect={redirect} />
		</MenuContentPanel>
	</>
}
