import {} from 'lodash';

const colorOptionsButton = ['default', 'inherit', 'primary', 'secondary'];

const colorOptionsLink = [
	'initial',
	'inherit',
	'primary',
	'secondary',
	'textPrimary',
	'textSecondary',
	'error',
];

const variantOptionsButton = [
	'text', // (default)
	'outlined',
	'contained',
];

const variantOptionsLink = [
	'inherit',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'subtitle1',
	'subtitle2',
	'body1',
	'body2',
	'button',
	'caption',
	'overline',
	'srOnly',
];

export const linkOptions = [
	{ field: 'underline', options: ['none', 'hover', 'always'] },
	{ field: 'color', options: colorOptionsLink },
	{
		field: 'gutterBottom',
		label: 'Add Space Below',
		options: ['true', 'false'],
	},
	{ field: 'disabled', options: ['true', 'false'] },
	{ field: 'display', options: ['initial', 'block', 'inline'] },
	{ field: 'variant', options: variantOptionsLink },
	{
		field: 'leftIcon',
		label: 'Left Icon',
		options: ['ChevronLeft', 'ChevronRight', 'none'],
	},
	{
		field: 'rightIcon',
		label: 'Right Icon',
		options: ['ChevronLeft', 'ChevronRight', 'none'],
	},
];

export const buttonOptions = [
	{ field: 'size', options: ['small', 'medium', 'large'] },
	{ field: 'color', options: colorOptionsButton },
	{ field: 'disabled', options: ['true', 'false'] },
	{ field: 'variant', options: variantOptionsButton },
	{
		field: 'disableElevation',
		label: 'Flat Appearance',
		options: ['true', 'false'],
	},
	{ field: 'fullWidth', label: 'Full Width', options: ['true', 'false'] },
	{
		field: 'leftIcon',
		label: 'Left Icon',
		options: ['ChevronLeft', 'ChevronRight', 'none'],
	},
	{
		field: 'rightIcon',
		label: 'Right Icon',
		options: ['ChevronLeft', 'ChevronRight', 'none'],
	},
	// { field: 'is_icon_button', options: ['true', 'false'] },
];
