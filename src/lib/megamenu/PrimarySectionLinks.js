import React from 'react';
import { styled } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import BadgeLabel from './BadgeLabel';
import { getDisplayedHref } from '../utilities/sitemap';

const Link = styled('a', {
	shouldForwardProp: (props) => props !== 'color' && props !== 'active'
})(({ active, disabled, color }) => ({
	display: 'block',
	color: '#DDDDDD',
	borderTop: '1px solid #979797',
	padding: '10px 5px',
	fontFamily: 'Montserrat',
	fontSize: 16,
	fontWeight: 'bold',
	letterSpacing: 0,
	lineHeight: '30px',
	backgroundColor: active ? '#13A792' : 'transparent',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	textDecoration: 'none',
	cursor: disabled ? 'default' : 'unset',
	'&:visited, &:active, &:hover, &:focus': {
		textDecoration: 'none',
		color: color,
	},
	'&:last-child': {
		borderBottom: '1px solid #979797',
	},
}));

const LinkRight = styled('div')({
	display: 'flex',
	alignItems: 'center',
});

const disabledColor = '#8091A5';

export default function PrimarySectionLinks({ links = [], activePrimarySection, setActivePrimarySection, redirect }) {

	const handleClick = (label, link, disabled, newTab = false) => {
		return (e) => {
			e.preventDefault();

			if (disabled)
				return;

			if (link)
				return redirect(link, newTab)

			setActivePrimarySection(label);
		}
	};

	return links.map((link, idx) => {
		const hideLink = link.hideWithoutPermission && !link.permission;
		const isDisabled = link.notAvailable || !!link.chip;
		const color = isDisabled ? disabledColor : '#DDDDDD';
		const href = getDisplayedHref(link.link);

		return !hideLink && <Link
			href={href}
			onClick={handleClick(link.label, link.link, isDisabled, link.newTab)}
			active={activePrimarySection === link.label}
			key={'primary-link' + idx}
			disabled={isDisabled}
			color={color}
		>
			<div style={{ color }}>{link.label}</div>
			{link.links &&
				<ChevronRightIcon style={{ fontSize: 30 }} />
			}
			{isDisabled &&
				<LinkRight data-test-id="primary-link-disabled">
					<BadgeLabel width={'110px'} backgroundColor={disabledColor} color="white">{link.chip || 'In Development'}</BadgeLabel>
				</LinkRight>
			}
		</Link>
	});
}
