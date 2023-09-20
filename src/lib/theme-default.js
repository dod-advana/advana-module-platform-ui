import { createTheme } from '@mui/material';

const themeDefault = createTheme({
	spacing: 5,
	palette: {
		primary: {
			main: '#13A792'
		},
		secondary: {
			main: '#386F94'
		}
	},
	typography: {
		useNextVariants: true,
		h1: {
			fontFamily: 'Montserrat',
			fontWeight: "bold",
			fontSize: 50,
			letterSpacing: 0,
			lineHeight: "62px"
		},
		h2: {
			fontFamily: 'Montserrat',
			fontWeight: 300, // light
			fontSize: 38,
			letterSpacing: 0,
			lineHeight: "48px"
		},
		h3: {
			fontFamily: 'Montserrat',
			fontWeight: 300, // light
			fontSize: 24,
			letterSpacing: 0,
			lineHeight: "30px"
		},
		h4: {
			fontFamily: 'Noto Sans',
			fontWeight: "bold",
			fontSize: 20,
			letterSpacing: "4.46px",
			lineHeight: "28px"
		},
		h5: {
			fontFamily: 'Montserrat',
			fontWeight: "normal",
			fontSize: 16,
			lineHeight: "20px"
		},
		h6: {
			fontFamily: 'Noto Sans',
			fontWeight: 500, // medium
			fontSize: 12,
			lineHeight: "18px"
		},
		body1: {
			fontFamily: 'Noto Sans',
			fontWeight: 'normal',
			fontSize: 20,
			letterSpacing: 0,
			lineHeight: "28px",
			color: "#3F4A56"
		},
		body2: {
			fontFamily: 'Noto Sans',
			fontWeight: 'normal',
			fontSize: 16,
			letterSpacing: 0,
			lineHeight: "22px"
		},
		button: {
			fontSize: 14,
			fontFamily: 'Montserrat',
			fontWeight: 500, // medium
		}
	},
	components: {
		MuiTab: {
			styleOverrides: {
				root: {
					color: '#8091A5',
					fontFamily: 'Noto Sans',
					fontWeight: 'normal',
					fontSize: 14,
					borderLeft: '1px solid #DFE9F4',
					borderRight: '1px solid #DFE9F4',
					"&.Mui-selected": {
						color: '#ffffff',
						backgroundColor: '#13A792'
					}
				},
				wrapper: {
					fontSize: 14,
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
					borderBottom: '2px solid #13A792',
				},
				indicator: {
					display: 'none',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				contained: {
					color: 'white',
					boxShadow: 'none',
					'&:visited': {
						color: 'white',
					},
					'&:hover': {
						color: 'white',
					},
				},
				outlined: {
					color: '#8091A5',
					border: '1px solid #B0B9BE',
					borderRadius: 6,
					backgroundColor: '#FFFFFF'
				},
				sizeSmall: {
					fontSize: 12,
					height: 30
				},
				sizeLarge: {
					fontSize: 16,
					minWidth: 200,
					height: 60,
				},
				root: {
					'&.Mui-disabled': {
						backgroundColor: 'grey',
						border: 'none',
					}
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: 12,
					backgroundColor: '#616161'
				},
				arrow: {
					color: '#616161'
				},
			},
		},
		MuiTable: {
			styleOverrides: {
				root: {
					'& th': {
						backgroundColor: 'white',
						borderRight: '1px solid rgba(224, 224, 224, 1)',
						borderTop: '1px solid rgba(224, 224, 224, 1)',
						padding: 5,
						minWidth: 200,
						maxWidth: 200
					},
					'& th:last-child': {
						borderRight: 'none'
					},
					'& tr:nth-child(odd)': {
						backgroundColor: '#f5f5f5',
					},
					'& tr:nth-child(even)': {
						backgroundColor: 'white',
					},
					'& td': {
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						minWidth: 200,
						maxWidth: 200,
						borderRight: '1px solid rgba(224, 224, 224, 1)',
					},
					'& td:last-child': {
						borderRight: 'none',
					},
				},
			},
		},
	}
});

export default themeDefault;
