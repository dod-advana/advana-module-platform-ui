import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import _ from 'lodash';

/**
 * Maps a set of props from state to be used in a Link
 * @param {object} linkOptionsState : boolean values to determine which keys are mapped
 * @param {String} href : href for the Link
 * @returns {object} : mapped props for the Link
 */
export function processLinkProps({ linkOptionsState, href }) {
	const mapped = _.mapValues(linkOptionsState, (value) => {
		if (value === 'true') return true;
		if (value === 'false') return false;

		return value;
	});
	mapped.href = href;

	if (mapped?.href?.startsWith('www.')) {
		mapped.href = 'https://' + mapped.href;
	}

	if (mapped?.disabled) {
		mapped.component = Typography;
	} else if (mapped?.href?.startsWith('http')) {
		mapped.component = 'a';
		mapped.target = '_blank';
		mapped.rel = 'noreferrer';
	} else {
		mapped.to = mapped.href;
		mapped.component = Link;
	}

	return mapped;
}
