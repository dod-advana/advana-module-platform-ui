import PrimarySectionLinks from '../../../src/lib/megamenu/PrimarySectionLinks';

describe('DISABLED LINKS', function () {
    before(() => {
		cy.fixture('primarySectionLinkData.json').then((linkData) => {
			this.linkData = linkData.linkData
		});
    });

    beforeEach(() => {
        const setActiveSpy = cy.spy().as('setActiveSpy');
        const redirectSpy = cy.spy().as('redirectSpy');
        cy.mount(
            <PrimarySectionLinks
        		links={this.linkData}
				activePrimarySection
				setActivePrimarySection={setActiveSpy}
				redirect={redirectSpy}
            />
        );
    });

	it('disables link if it is marked notAvailable', () => {
        cy.get('[data-test-id="primary-link-disabled"]').click({ multiple: true })

		cy.get('@setActiveSpy').should('not.have.been.called');
		cy.get('@redirectSpy').should('not.have.been.called');
    });

	it('disables link if it has a chip value', async () => {
        cy.contains('with chip').closest('a').click();

		cy.get('@setActiveSpy').should('not.have.been.called');
		cy.get('@redirectSpy').should('not.have.been.called');
	});

	it('redirects on click if link is supplied', async () => {
		cy.contains(this.linkData[0].label).closest('a').click();

        cy.get('@redirectSpy').should('have.been.calledWith', this.linkData[0].link, false);
		cy.get('@setActiveSpy').should('not.have.been.called');
	});

	it('sets active link if not disabled and no link supplied', async () => {
		cy.contains(this.linkData[4].label).closest('a').click();

		cy.get('@redirectSpy').should('not.have.been.called');
		cy.get('@setActiveSpy').should('have.been.calledWith', this.linkData[4].label);
	});
});

describe('LINK RESPONSIVENESS', function () {
    before(() => {
		cy.fixture('primarySectionLinkData.json').then((linkData) => {
			this.linkData = linkData.linkData
		});
    });

    beforeEach(() => {
        cy.mount(
            <PrimarySectionLinks
        		links={this.linkData}
				activePrimarySection
            />
        );
    });

    it('hides link if no permission and hideWithoutPermission is set to true', () => {
        cy.contains('hidden').should('not.exist');
    });

    it('chip says "In Development" if disabled and there is no chip text provided', () => {
        cy.contains('not available').next().should('exist');
    });
});