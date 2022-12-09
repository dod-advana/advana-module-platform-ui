import SecondarySectionLinks from '../../../src/lib/megamenu/SecondarySectionLinks';

describe('calls right callback based on whether link is disabled or has a link or not', function () {
    before(() => {
		cy.fixture('secondarySectionLinkData.json').then((linkData) => {
			this.linkData = linkData.linkData
		});
    });

    beforeEach(() => {
        const setActiveSpy = cy.spy().as('setActiveSpy');
        const redirectSpy = cy.spy().as('redirectSpy');
		cy.mount(
			<SecondarySectionLinks
				links={this.linkData}
				activeSecondarySection
				setActiveSecondarySection={setActiveSpy}
				redirect={redirectSpy}
			/>
		);
    });

	it('disables link if it is marked notAvailable', async () => {
		cy.contains('not available').closest('a').click();

		cy.get('@setActiveSpy').should('not.have.been.called');
		cy.get('@redirectSpy').should('not.have.been.called');
	});

	it('disables link if it has a chip value', async () => {
        cy.contains('with chip').closest('a').click();

		cy.get('@setActiveSpy').should('not.have.been.called');
		cy.get('@redirectSpy').should('not.have.been.called');
	});

	it('disables link if no permission', async () => {
		cy.contains('no permission').closest('a').click();

		cy.get('@setActiveSpy').should('not.have.been.called');
		cy.get('@redirectSpy').should('not.have.been.called');
	});

	it('redirects on click if link is supplied', async () => {
		cy.contains('with link').closest('a').click();

		cy.get('@redirectSpy').should('have.been.calledWith', '#/with/link', false);
		cy.get('@setActiveSpy').should('not.have.been.called');
	});

	it('sets active link if not disabled and no link supplied', async () => {
		cy.contains('without link').closest('a').click();

		cy.get('@redirectSpy').should('not.have.been.called');
		cy.get('@setActiveSpy').should('have.been.calledWith', 'without link');
	});
});

describe('uses the right text for chip', function () {
    before(() => {
		cy.fixture('secondarySectionLinkData.json').then((linkData) => {
			this.linkData = linkData.linkData
		});
    });

    beforeEach(() => {
		cy.mount(
			<SecondarySectionLinks
				links={this.linkData}
			/>
		);
    });
	it('sets chip to "Request Access" if no permission', async () => {
		cy.contains('no permission').next().should('contain', 'Request Access');
	});

	it('sets chip to "In Development" if notAvailable', async () => {
		cy.contains('not available').next().should('contain', 'In Development');
	});

	it('sets chip to custom value if permission is true', async () => {
		cy.contains('with chip').next().should('contain', 'mmmm');
	});
});

describe('HIDDEN LINKS', function () {
    before(() => {
		cy.fixture('secondarySectionLinkData.json').then((linkData) => {
			this.linkData = linkData.linkData
		});
    });

    beforeEach(() => {
		cy.mount(
			<SecondarySectionLinks
				links={this.linkData}
                activePrimarySection
			/>
		);
    });

    it('hides link if no permission and hideWithoutPermission is set to true', () => {
        cy.contains('hidden').should('not.exist');
    });
});