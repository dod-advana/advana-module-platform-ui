import React from 'react';
import 'regenerator-runtime/runtime';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import SecondarySectionLinks from '../src/lib/megamenu/SecondarySectionLinks';

const linkData = [
	{
		label: 'with chip',
		link: '#/landing/analytics/covid19',
		chip: 'mmmm',
		description: null,
		newTab: false,
		permission: true,
		link_identifier: null,
		notAvailable: false,
	},
	{
		label: 'no permission',
		link: 'https://covid-status.data.mil/#/',
		chip: 'kk',
		description: null,
		newTab: true,
		permission: false,
		link_identifier: null,
		notAvailable: false,
	},
	{
		label: 'not available',
		link: 'https://qlik.advana.data.mil/sense/app/22935916-ee66-4bfc-afe8-b4f1bda5880d',
		chip: null,
		description: null,
		newTab: true,
		permission: true,
		link_identifier: null,
		notAvailable: true,
	},
	{
		label: 'with link',
		link: '#/with/link',
		description: null,
		newTab: false,
		permission: true,
		link_identifier: null,
		notAvailable: false,
	},
	{
		label: 'without link',
		link: null,
		description: null,
		newTab: false,
		permission: true,
		link_identifier: null,
		notAvailable: false,
	},
	{
		label: 'hidden',
		link: null,
		description: null,
		newTab: false,
		permission: false,
		link_identifier: null,
		notAvailable: false,
		hideWithoutPermission: true
	},
];

describe('calls right callback based on whether link is disabled or has a link or not', () => {
	test('disables link if it is marked notAvailable', async () => {
		const mockRedirect = jest.fn();
		const mockSetActive = jest.fn();

		render(
			<SecondarySectionLinks
				links={linkData}
				activeSecondarySection
				setActiveSecondarySection={mockSetActive}
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
			<SecondarySectionLinks
				links={linkData}
				activeSecondarySection
				setActiveSecondarySection={mockSetActive}
				redirect={mockRedirect}
			/>
		);

		const element = screen.getByText('with chip').closest('a');
		userEvent.click(element);

		expect(mockRedirect).toHaveBeenCalledTimes(0);
		expect(mockSetActive).toHaveBeenCalledTimes(0);
	});

	test('disables link if no permission', async () => {
		const mockRedirect = jest.fn();
		const mockSetActive = jest.fn();

		render(
			<SecondarySectionLinks
				links={linkData}
				activeSecondarySection
				setActiveSecondarySection={mockSetActive}
				redirect={mockRedirect}
			/>
		);

		const element = screen.getByText('no permission').closest('a');
		userEvent.click(element);

		expect(mockRedirect).toHaveBeenCalledTimes(0);
		expect(mockSetActive).toHaveBeenCalledTimes(0);
	});

	test('redirects on click if link is supplied', async () => {
		const mockRedirect = jest.fn();
		const mockSetActive = jest.fn();

		render(
			<SecondarySectionLinks
				links={linkData}
				activeSecondarySection
				setActiveSecondarySection={mockSetActive}
				redirect={mockRedirect}
			/>
		);

		const element = screen.getByText('with link').closest('a');
		userEvent.click(element);

		expect(mockRedirect).toHaveBeenCalledTimes(1);
		expect(mockRedirect).toHaveBeenLastCalledWith('#/with/link', false);
		expect(mockSetActive).toHaveBeenCalledTimes(0);
	});

	test('sets active link if not disabled and no link supplied', async () => {
		const mockRedirect = jest.fn();
		const mockSetActive = jest.fn();

		render(
			<SecondarySectionLinks
				links={linkData}
				activeSecondarySection
				setActiveSecondarySection={mockSetActive}
				redirect={mockRedirect}
			/>
		);

		const element = screen.getByText('without link').closest('a');
		userEvent.click(element);

		expect(mockRedirect).toHaveBeenCalledTimes(0);
		expect(mockSetActive).toHaveBeenCalledTimes(1);
		expect(mockSetActive).toHaveBeenLastCalledWith('without link');
	});
});

describe('uses the right text for chip', () => {
	test('sets chip to "Request Access" if no permission', async () => {
		render(<SecondarySectionLinks links={linkData} />);

		expect(screen.queryByText('no permission').nextSibling).toContainHTML(
			'Request Access'
		);
	});

	test('sets chip to "In Development" if notAvailable', async () => {
		render(<SecondarySectionLinks links={linkData} />);

		expect(screen.queryByText('not available').nextSibling).toContainHTML(
			'In Development'
		);
	});

	test('sets chip to custom value if permission is true', async () => {
		render(<SecondarySectionLinks links={linkData} />);

		expect(screen.queryByText('with chip').nextSibling).toContainHTML('mmmm');
	});
});

test('hides link if no permission and hideWithoutPermission is set to true', () => {
	render(
		<SecondarySectionLinks
			links={linkData}
			activePrimarySection
		/>
	);

	expect(screen.queryByText('hidden')).not.toBeInTheDocument();
});