import React from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export default function IconForButtonLink({ icon = 'none', style = {} }) {
	if (icon === 'none') return null;
	if (icon === 'ChevronRight') return <ChevronRightIcon style={style} />;
	if (icon === 'ChevronLeft') return <ChevronLeftIcon style={style} />;
}
