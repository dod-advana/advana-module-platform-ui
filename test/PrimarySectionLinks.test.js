import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import PrimarySectionLinks from '../src/lib/megamenu/PrimarySectionLinks';

const linkData = [
	{ label: 'with link', link: '#/landing/initiatives' },
	{ label: 'without link', link: null },
	{ label: 'not available', link: '#/landing', notAvailable: true },
	{ label: 'with chip', link: '#/landing/initiatives', chip: 'bbb' },
	{
		label: 'with multiple links',
		links: [
			{
				label: 'COVID-19 Response Overview',
				link: '#/landing/analytics/covid19',
				chip: null,
				description: null,
				newTab: false,
				permission: true,
				link_identifier: null,
				notAvailable: false,
			},
			{
				label: 'DoD COVID-19 Response and Operations Platform ',
				link: 'https://covid-status.data.mil/#/',
				chip: null,
				description: null,
				newTab: true,
				permission: true,
				link_identifier: null,
				notAvailable: false,
			},
			{
				label: 'COVID-19 Analytics',
				link: 'https://qlik.advana.data.mil/sense/app/22935916-ee66-4bfc-afe8-b4f1bda5880d',
				chip: null,
				description: null,
				newTab: true,
				permission: true,
				link_identifier: null,
				notAvailable: false,
			},
		],
	},
	{ label: 'hidden', link: '#/landing/initiatives', hideWithoutPermission: true },
];

describe('calls right callback based on whether link is disabled or has a link or not', () => {
	test('disables link if it is marked notAvailable', async () => {
		const mockRedirect = jest.fn();
		const mockSetActive = jest.fn();

		render(
			<PrimarySectionLinks
				links={linkData}
				activePrimarySection
				setActivePrimarySection={mockSetActive}
				redirect={mockRedirect}
			/>
		);

		const element = screen.getByText('not available').closest('a');
		userEvent.click(element);

		expect(mockRedirect).toHaveBeenCalledTimes(0);
		expect(mockSetActive).toHaveBeenCalledTimes(0);
	});

	test('disables link if it has a chip value', async () => {
		const mockRedirect = jest.fn();
		const mockSetActive = jest.fn();

		render(
			<PrimarySectionLinks
				links={linkData}
				activePrimarySection
				setActivePrimarySection={mockSetActive}
				redirect={mockRedirect}
			/>
		);

		const element = screen.getByText('with chip').closest('a');
		userEvent.click(element);

		expect(mockRedirect).toHaveBeenCalledTimes(0);
		expect(mockSetActive).toHaveBeenCalledTimes(0);
	});

	test('redirects on click if link is supplied', async () => {
		const mockRedirect = jest.fn();
		const mockSetActive = jest.fn();

		render(
			<PrimarySectionLinks
				links={linkData}
				activePrimarySection
				setActivePrimarySection={mockSetActive}
				redirect={mockRedirect}
			/>
		);

		const element = screen.getByText(linkData[0].label).closest('a');
		userEvent.click(element);

		expect(mockRedirect).toHaveBeenCalledTimes(1);
		expect(mockRedirect).toHaveBeenLastCalledWith(linkData[0].link);
		expect(mockSetActive).toHaveBeenCalledTimes(0);
	});

	test('sets active link if not disabled and no link supplied', async () => {
		const mockRedirect = jest.fn();
		const mockSetActive = jest.fn();

		render(
			<PrimarySectionLinks
				links={linkData}
				activePrimarySection
				setActivePrimarySection={mockSetActive}
				redirect={mockRedirect}
			/>
		);

		const element = screen.getByText(linkData[4].label).closest('a');
		userEvent.click(element);

		expect(mockRedirect).toHaveBeenCalledTimes(0);
		expect(mockSetActive).toHaveBeenCalledTimes(1);
		expect(mockSetActive).toHaveBeenLastCalledWith(linkData[4].label);
	});
});

test('hides link if no permission and hideWithoutPermission is set to true', () => {
	render(
		<PrimarySectionLinks
			links={linkData}
			activePrimarySection
		/>
	);

	expect(screen.queryByText('hidden')).not.toBeInTheDocument();
});

test('chip says "In Development" if disabled and there is no chip text provided', () => {
	render(
		<PrimarySectionLinks
			links={linkData}
			activePrimarySection
		/>
	);

	expect(screen.queryByText('not available').nextSibling).toContainHTML('In Development')
});