import React from 'react';
import 'regenerator-runtime/runtime';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import AdvanaMegaMenu from '../src/lib/megamenu/AdvanaMegaMenu';
import preprocessedMegaMenuLinks from './test-data/preprocessedMegaMenuLinks';
import { getDynamicHeaderButtons } from '../src/lib/utilities/sitemap';
const HEADER_BUTTONS = getDynamicHeaderButtons(preprocessedMegaMenuLinks.links);

test('opens and closes menu when header buttons are clicked', async () => {
	AdvanaMegaMenu.__Rewire__('getLinks', () =>
		Promise.resolve(preprocessedMegaMenuLinks.links)
	);
	AdvanaMegaMenu.__Rewire__('getDynamicHeaderButtons', () =>
		getDynamicHeaderButtons(preprocessedMegaMenuLinks.links)
	);
	render(<AdvanaMegaMenu />);

	for (const headerButton of HEADER_BUTTONS) {
		const element = screen.getByText(headerButton.label);

		userEvent.click(element);
		await waitFor(() =>
			expect(screen.getByText(/view page/i)).toBeInTheDocument()
		);

		userEvent.click(element);
		await waitFor(() =>
			expect(screen.queryByText(/view page/i)).not.toBeInTheDocument()
		);

		userEvent.click(element);
	}
});

test('closes menu when close button is clicked', async () => {
	AdvanaMegaMenu.__Rewire__('getLinks', () =>
		Promise.resolve(preprocessedMegaMenuLinks.links)
	);
	AdvanaMegaMenu.__Rewire__('getDynamicHeaderButtons', () =>
		getDynamicHeaderButtons(preprocessedMegaMenuLinks.links)
	);
	render(<AdvanaMegaMenu showCloseButton />);

	for (const headerButton of HEADER_BUTTONS) {
		const headerElement = screen.getByText(headerButton.label);

		userEvent.click(headerElement);
		const closeElement = screen.getByTestId('close');

		userEvent.click(closeElement);
		await waitFor(() =>
			expect(screen.queryByText(/view page/i)).not.toBeInTheDocument()
		);
	}
});

const testLinks = {
	Analytics: {
		title: 'ANALYTICS',
		description: 'Outer section description',
		link: '#/landing/analytics',
		links: [
			{
				label: 'A',
				link: '#/landing/analytics',
				chip: null,
				description: 'landing analytics overview page',
				newTab: false,
				permission: null,
				link_identifier: null,
				notAvailable: false,
			},
			{
				label: 'B',
				links: [
					{
						label: 'B1',
						link: '#/landing/analytics/acquisition',
						chip: null,
						description: null,
						newTab: false,
						permission: null,
						link_identifier: null,
						notAvailable: false,
					},
				],
			},
			{
				label: 'C',
				links: [
					{
						label: 'C1',
						link: '#',
						chip: null,
						description: null,
						newTab: false,
						permission: null,
						link_identifier: null,
						notAvailable: true,
					},
					{
						label: 'C2',
						links: [
							{
								label: 'C2a',
								link: '#/landing/analytics/covid19',
								chip: null,
								description: null,
								newTab: false,
								permission: null,
								link_identifier: null,
								notAvailable: false,
							},
							{
								label: 'C2b',
								link: 'https://qlik.advana.data.mil/sense/app/22935916-ee66-4bfc-afe8-b4f1bda5880d',
								chip: null,
								description: null,
								newTab: true,
								permission: null,
								link_identifier: null,
								notAvailable: false,
							},
						],
						permission: null,
					},
				],
			},
		],
	},
};

test('opens child links', async () => {
	AdvanaMegaMenu.__Rewire__('getLinks', () =>
		Promise.resolve(testLinks)
	);
	AdvanaMegaMenu.__Rewire__('getDynamicHeaderButtons', () =>
		getDynamicHeaderButtons(preprocessedMegaMenuLinks.links)
	);

	render(<AdvanaMegaMenu />);

	const outer = screen.getByText(/analytics/i);
	userEvent.click(outer.closest('button'));

	const inner1 = await screen.findByText('C');
	userEvent.click(inner1);

	const nds = await screen.findByText('C2');
	userEvent.click(nds.closest('a'));

	expect(screen.getByText('C2a')).toBeInTheDocument();
	expect(screen.getByText('C2b')).toBeInTheDocument();
});

AdvanaMegaMenu.__ResetDependency__('getDynamicHeaderButtons');
AdvanaMegaMenu.__ResetDependency__('getLinks');

