import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const themeDefault = createMuiTheme({
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
			fontWeight: "300",
			fontSize: 48,
			letterSpacing: 0,
			lineHeight: "58px"
		},
		h2: {
			fontFamily: 'Montserrat',
			fontWeight: "bold",
			fontSize: 38,
			letterSpacing: 0,
			lineHeight: "48px"
		},
		h3: {
			fontFamily: 'Montserrat',
			fontWeight: "bold",
			fontSize: 24,
			letterSpacing: 0,
			lineHeight: "30px"
		},
		h4: {
			fontFamily: 'Noto Sans',
			fontWeight: "bold",
			fontSize: 18,
			letterSpacing: "4.46px",
			lineHeight: "24px"
		},
		h5: {
			fontFamily: 'Montserrat',
			fontWeight: "bold",
			fontSize: 16,
			lineHeight: "20px"
		},
		h6: {
			fontFamily: 'Montserrat',
			fontWeight: "bold",
			fontSize: 12,
			lineHeight: "16px"
		},
		body1: {
			fontFamily: 'Noto Sans',
			fontSize: 20,
			letterSpacing: 0,
			lineHeight: "28px",
			color: "#3F4A56"
		},
		body2: {
			fontFamily: 'Noto Sans',
			fontSize: 16,
			letterSpacing: 0,
			lineHeight: "24px"
		},
		button: {
			fontSize: 16,
			fontFamily: 'Montserrat',
			fontWeight: "bold",
		}
	},
	overrides: {
		MuiTab: {
			root: {
				color: '#8091A5',
				fontSize: '14px',
				borderLeft: '1px solid #DFE9F4',
				borderRight: '1px solid #DFE9F4',
				"&$selected": {
					color: '#ffffff',
					backgroundColor: '#13A792'
				}
			},
			wrapper: {
				fontSize: '14px',
			},
		},
		MuiTabs: {
			root: {
				backgroundColor: 'transparent',
				borderBottom: '2px solid #13A792',
			},
			indicator: {
				display: 'none',
			},
		},
		MuiButton: {
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
				'&$disabled': {
					backgroundColor: 'grey',
					border: 'none',
				}
			}
		},
		MuiTooltip: {
			tooltip: {
				fontSize: '14px',
				backgroundColor: 'rgb(40,40,40)'
			},
			arrow: {
				color: 'rgb(40,40,40)'
			}
		},
		MuiTable: {
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
		}
	}
});

export default themeDefault;
