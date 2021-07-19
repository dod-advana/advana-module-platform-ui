import React from 'react';
import styled from 'styled-components';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BadgeLabel from './BadgeLabel';

const Link = styled.a`
	display: block;
	color: #DDDDDD;
	border-top: 1px solid #979797;

	padding: 10px 5px;
	font-family: Montserrat;
	font-size: 16px;
	font-weight: bold;
	letter-spacing: 0;
	line-height: 30px;

	background-color: ${({ active }) => active ? '#13A792' : 'transparent'};

	display: flex;
	align-items: center;
	justify-content: space-between;

	text-decoration: none;

	${({ disabled }) => disabled && 'cursor: default;'}
	&:visited, &:active, &:hover, &:focus {
		text-decoration: none;
		color: ${({ color }) => color};
	}

	&:last-child {
		border-bottom: 1px solid #979797;
	}
`;

const LinkRight = styled.div`
	display: flex;
	align-items: center;
`;

const disabledColor = '#8091A5';

export default function PrimarySectionLinks({ links = [], activePrimarySection, setActivePrimarySection, redirect }) {

	const handleClick = (label, link, disabled) => {
		return (e) => {
			e.preventDefault();

			if (disabled)
				return;

			if (link)
				return redirect(link)

			setActivePrimarySection(label);
		}
	};

	return links.map((link, idx) => {
		const hideLink = link.hideWithoutPermission && !link.permission;
		const isDisabled = link.notAvailable || !!link.chip;
		const color = isDisabled ? disabledColor : '#DDDDDD';

		return !hideLink && <Link
			href={link.link || '#nolink'}
			onClick={handleClick(link.label, link.link, isDisabled)}
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
				<LinkRight>
					<BadgeLabel width={'110px'} backgroundColor={disabledColor} color="white">{link.chip || 'In Development'}</BadgeLabel>
				</LinkRight>
			}
		</Link>
	});
}