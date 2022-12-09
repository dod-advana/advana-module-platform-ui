import AdditionalBanners from '../../src/lib/AdditionalBanners';
import Config from '../../src/lib/config/config';

describe('RENDERS', function () {
    before(() => {
        cy.fixture('additionalBanners.json').then((banners) => {
			this.banners =  banners.banners
		});
    })

    beforeEach(() => {
        cy.intercept(Config.BANNER_LINK, (req) => {
            req.reply(200, this.banners);
        });

        cy.intercept('/', (req) => {
            req.reply(200);
        }).as('bannerLinkIntercept');

        const handleOffsetSpy = cy.spy().as('handleOffsetSpy');
        cy.mount(<AdditionalBanners handleOffset={handleOffsetSpy} appName="Advana"/>);
    });

    it('Displays a banner', () => {
        cy.get('[data-test-id="additional-banners"]').should('exist').should('be.visible');

        // Only two of the banners are eligible to be displayed
        cy.get('[data-test-id="additional-banners"] a').should('have.length', 2); 
        cy.get('@handleOffsetSpy').should('have.been.called', 1);
        cy.get('@handleOffsetSpy').should('have.been.calledWith', 2)
    });

    it('Does not display a banner that has not been marked for display', () => {
        cy.get('[data-test-id="additional-banners"]').should('exist').should('be.visible');

        const notDisplayed = this.banners.filter(banner => banner.display === 'No')[0];
        cy.get('[data-test-id="additional-banners"]').should('not.contain', notDisplayed.description);
    });

    it('Displays banners marked All', () => {
        const allBanner = this.banners.filter(banner => banner.app_space === 'All')[0];
        cy.get('[data-test-id="additional-banners"]').should('contain', allBanner.description);
    });

    it('Does not display banners outside of the app space', () => {
        const outsideBanner = this.banners.filter(banner => banner.display === 'Yes' && banner.app_space !== 'All' && banner.app_space !== 'Advana');
        cy.get('[data-test-id="additional-banners"]').should('not.contain', outsideBanner.description);
    });

    it('Links to banner specific link', () => {
        const linkedBanner = this.banners.filter(banner => banner.app_space === 'Advana' && banner.display === 'Yes')[0];
        cy.get('[data-test-id="additional-banners"]').should('contain', linkedBanner.description);

        cy.get('[data-test-id="additional-banners"]').contains(linkedBanner.description).click()

        cy.wait('@bannerLinkIntercept').then(interception => {
            expect(interception.response.statusCode).to.equal(200);
        });
    });
});