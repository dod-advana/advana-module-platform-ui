import React from 'react';
import styled from 'styled-components';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BadgeLabel from './BadgeLabel';

const Link = styled.a`
	display: block;
	padding: 5px;
	font-family: Montserrat;
	font-size: 16px;
	font-weight: bold;
	letter-spacing: 0;
	line-height: 30px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-decoration: none;

	${({ disabled }) => disabled && 'cursor: default;'}
	color: ${({ color }) => color};
	&:visited, &:active, &:focus {
		color: ${({ color }) => color};
		text-decoration: none;
	}
	&:hover {
		color: ${({ color, disabled }) => disabled ? color : '#56B1AC'};
		text-decoration: ${({ disabled }) => disabled ? 'none' : ''};
	}
`;

const LinkRight = styled.div`
	display: flex;
	align-items: center;
`;

const noop = () => { };

export default function SecondarySectionLinks({ links = [], title = '', activeSecondarySection, setActiveSecondarySection = noop, redirect }) {
	const handleClick = (label, disabled, link) => {
		return (e) => {
			e.preventDefault();
			if (disabled) {
				return;
			}

			if (link)
				return redirect(link);

			setActiveSecondarySection(label);
		}
	}
	const extraLinks = [];

	const menuLinks = links.map((link, idx) => {
		const isDisabled = !link.permission || link.notAvailable || !!link.chip;
		const hideLink = link.hideWithoutPermission && !link.permission;

		const chip = (!link.permission && 'Request Access') || link.chip || (link.notAvailable && 'In Development') || null;

		const active = activeSecondarySection === link.label;
		const disabledColor = '#8091A5';
		const activeColor = '#56B1AC';
		const color = active ? activeColor : isDisabled ? disabledColor : '#DDDDDD';

		return !hideLink && <Link
			href={link.link || '#nolink'}
			onClick={handleClick(link.label, isDisabled, link.link)}
			disabled={isDisabled}
			color={color}
			key={'secondary-link' + idx}
		>
			<div>{link.label}</div>
			{link.links && <ChevronRightIcon style={{ fontSize: 30 }} />}

			{chip &&
				<LinkRight>
					<BadgeLabel width={'110px'} backgroundColor={disabledColor} color="white">{chip}</BadgeLabel>
				</LinkRight>
			}
		</Link>
	});
	return menuLinks.concat(extraLinks);
}
