import React from 'react';
import { darken, styled } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import BadgeLabel, { LinkableBadgeLabel } from './BadgeLabel';
import Config from '../config/config';
import { getDisplayedHref } from '../utilities/sitemap';

const Link = styled('a', {
	shouldForwardProp: (props) => props !== 'color'
})(({ disabled, color }) => ({
	display: 'block',
	padding: 5,
	fontFamily: 'Montserrat',
	fontSize: 16,
	fontWeight: 'bold',
	letterSpacing: 0,
	lineHeight: '30px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	textDecoration: 'none',
	cursor: disabled ? 'default' : 'unset',
	color: color,
	'&:visited, &:active, &:focus': {
		color: color,
		textDecoration: 'none',
	},
	'&:hover': {
		color: disabled ? color : Config.MEGA_MENU_HIGHLIGHT_COLOR,
		textDecoration: disabled ? 'none' : '',
	},
}));

const LinkRight = styled('div')({
	display: 'flex',
	alignItems: 'center',
});

const noop = () => { };

const REQUEST_ACCESS = 'Request Access';

export default function SecondarySectionLinks({ links = [], title = '', activeSecondarySection, setActiveSecondarySection = noop, redirect }) {
	const handleClick = (label, disabled, link, newTab = false) => {
		return (e) => {
			e.preventDefault();
			if (disabled) {
				return;
			}

			if (link)
				return redirect(link, newTab);

			setActiveSecondarySection(label);
		}
	}
	const extraLinks = [];

	const menuLinks = links.map((link, idx) => {
		const isDisabled = !link.permission || link.notAvailable || !!link.chip;
		const hideLink = link.hideWithoutPermission && !link.permission;

		const chip = (!link.permission && REQUEST_ACCESS) || link.chip || (link.notAvailable && 'In Development') || null;
		const isChipLinkable = chip === REQUEST_ACCESS && Config.MEGA_MENU_REQUEST_ACCESS_CHIP_LINK;
		const ChipComponent = isChipLinkable ? LinkableBadgeLabel : BadgeLabel;

		const active = activeSecondarySection === link.label;
		const disabledColor = '#8091A5';
		const activeColor = Config.MEGA_MENU_HIGHLIGHT_COLOR;
		const color = active ? activeColor : isDisabled ? disabledColor : '#DDDDDD';
		const href = getDisplayedHref(link.link);

		const chipProps = {
			width: '110px',
			backgroundColor: disabledColor,
			color: 'white',
			...(isChipLinkable
				? {
					href: Config.MEGA_MENU_REQUEST_ACCESS_CHIP_LINK,
					target: "_blank",
					onClick: (e) => e.stopPropagation(),
					sx: {
						'&:hover': {
							color: 'white',
							textDecoration: 'none',
							backgroundColor: darken(disabledColor, 0.1)
						}
					}
				}
				: {}
			)
		}

		return !hideLink && <Link
			data-test-id="secondary-link"
			href={href}
			onClick={handleClick(link.label, isDisabled, link.link, link.newTab)}
			disabled={isDisabled}
			color={color}
			key={'secondary-link' + idx}
		>
			<div>{link.label}</div>
			{link.links && <ChevronRightIcon style={{ fontSize: 30 }} />}

			{chip &&
				<LinkRight>
					<ChipComponent {...chipProps}>
						{chip}
					</ChipComponent>
				</LinkRight>
			}
		</Link>
	});
	return menuLinks.concat(extraLinks);
}
