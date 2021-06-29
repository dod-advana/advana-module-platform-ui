import React from 'react';
import AdvanaMegaMenuContentOneLevel from './AdvanaMegaMenuContentOneLevel';
import AdvanaMegaMenuContentTwoLevels from './AdvanaMegaMenuContentTwoLevels';
import AdvanaMegaMenuContentThreeLevels from './AdvanaMegaMenuContentThreeLevels';

const oneLevelSections = ['About', 'Applications', 'Learn', 'Support'];
const twoLevelSections = ['Initiatives', 'Tools'];
// const threeLevelSections = ['Analytics'];

export default function AdvanaMegaMenuContent(props) {
	const isOneLevel = oneLevelSections.includes(props.header);
	const isTwoLevel = twoLevelSections.includes(props.header);
	if (isOneLevel) return <AdvanaMegaMenuContentOneLevel {...props} />;
	else if (isTwoLevel) return <AdvanaMegaMenuContentTwoLevels {...props} />
	return  <AdvanaMegaMenuContentThreeLevels {...props} />
}