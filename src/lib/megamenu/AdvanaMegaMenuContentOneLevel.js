import React from 'react';
import { Button } from '@material-ui/core';
import SecondarySectionLinks from './SecondarySectionLinks';
import { styles, MenuTitle, MenuDescription } from './AdvanaMegaMenuStyleElements';
import Config from '../config/config';

export default function AdvanaMegaMenuContentOneLevel({
	data = {},
	redirect
}) {
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
		<div className="col-xs-5 mega-menu-scrollbar" style={styles.columnStyles}>
			<SecondarySectionLinks title={data?.title} links={data?.links} tertiary={true} redirect={redirect} />
		</div>
	</div>
}
