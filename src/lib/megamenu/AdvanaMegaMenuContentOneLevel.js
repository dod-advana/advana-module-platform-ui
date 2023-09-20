import React from 'react';
import SecondarySectionLinks from './SecondarySectionLinks';
import { MenuContentPanel, MenuInfoPanel } from './AdvanaMegaMenuStyleElements';
import Config from '../config/config';

export default function AdvanaMegaMenuContentOneLevel({
	data = {},
	redirect
}) {
	return <>
		<MenuInfoPanel
			title={data.title}
			description={data.description}
			buttonBackgroundColor={Config.MEGA_MENU_HIGHLIGHT_COLOR}
			buttonOnClick={() => redirect(data?.link ?? '#', data?.newTab)}
		/>
		<MenuContentPanel xs={5}>
			<SecondarySectionLinks title={data?.title} links={data?.links} tertiary={true} redirect={redirect} />
		</MenuContentPanel>
	</>
}
