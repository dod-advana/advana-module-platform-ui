import React from 'react';
import AdvanaMegaMenuContentOneLevel from './AdvanaMegaMenuContentOneLevel';
import AdvanaMegaMenuContentTwoLevels from './AdvanaMegaMenuContentTwoLevels';
import AdvanaMegaMenuContentThreeLevels from './AdvanaMegaMenuContentThreeLevels';
import Config from '../config/config';

const oneLevelSections = Config.MEGA_MENU_ONE_LEVEL_SECTIONS.split(',').map(s => s.trim());
const twoLevelSections = Config.MEGA_MENU_TWO_LEVEL_SECTIONS.split(',').map(s => s.trim());

export default function AdvanaMegaMenuContent(props) {
	const isOneLevel = oneLevelSections.includes(props.header);
	const isTwoLevel = twoLevelSections.includes(props.header);
	if (isOneLevel) return <AdvanaMegaMenuContentOneLevel {...props} />;
	else if (isTwoLevel) return <AdvanaMegaMenuContentTwoLevels {...props} />
	return  <AdvanaMegaMenuContentThreeLevels {...props} />
}
