import React from 'react';
import { Button, Grid, styled } from '@mui/material';

const MenuContentPanel = ({
	xs = 3,
	style = {},
	children,
}) => {
	return (
		<ContentGridItem item xs={xs} style={style}>
			{children}
		</ContentGridItem>
	);
};

const ContentGridItem = styled(Grid)({
	padding: '0 20px',
	'&::-webkit-scrollbar': {
		width: 10,
	},
	'&::-webkit-scrollbar-track': {
		background: 'transparent',
	},
	'&::-webkit-scrollbar-thumb': {
		background: 'rgba(255,255,255,0.25)',
	},
	'&::-webkit-scrollbar-thumb:hover': {
		background: 'rgba(255,255,255,1)',
	},
});

const MenuInfoPanel = ({
	xs = 3,
	style = {},
	title,
	description,
	buttonBackgroundColor,
	buttonOnClick,
}) => {
	return (
		<MenuContentPanel xs={xs} style={style}>
			<InfoPanelTitle>{title}</InfoPanelTitle>
			<InfoPanelDescription>{description}</InfoPanelDescription>
			<InfoPanelButton
				variant={'contained'}
				size={'large'}
				color="primary"
				$buttonBackgroundColor={buttonBackgroundColor}
				onClick={buttonOnClick}
			>
				View Page
			</InfoPanelButton>
		</MenuContentPanel>
	);
}

const InfoPanelTitle = styled('div')({
	fontFamily: 'Montserrat',
	fontSize: 30,
	fontWeight: 600,
	height: '1.5em',
});

const InfoPanelDescription = styled('div')({
	color: '#FFFFFF',
	fontFamily: "Noto Sans",
	fontSize: 16,
	letterSpacing: 0,
	lineHeight: '24px',
});

const InfoPanelButton = styled(Button, {
	shouldForwardProp: (props) => !props.startsWith('$')
})(({ $buttonBackgroundColor }) => ({
	marginTop: 20,
	backgroundColor: $buttonBackgroundColor,
}));

export { MenuContentPanel, MenuInfoPanel };
