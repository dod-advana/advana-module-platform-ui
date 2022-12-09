import AdvanaMegaMenu from '../../../src/lib/megamenu/AdvanaMegaMenu';
import { getDynamicHeaderButtons } from '../../../src/lib/utilities/sitemap';

describe('MEGA MENU', function () {
    before(() => {
		cy.fixture('preprocessedMegaMenuLinksShort.json').then((links) => {
			this.preprocessedMegaMenuLinks = links
		});

        this.headerButtons = getDynamicHeaderButtons(this.preprocessedMegaMenuLinks)
    });

    beforeEach(() => {
        cy.viewport(1000,1000);
        cy.intercept('GET', '**', (req) => {
            console.log('called')
            req.reply(200, {links: this.preprocessedMegaMenuLinks})
        }).as('getLinks');
        cy.mount(
            <AdvanaMegaMenu 
				showCloseButton={true}
            />
        );
    });

    it('opens and closes menu when a header button is clicked', () => {
        for(let primary of Object.keys(this.preprocessedMegaMenuLinks)){
            cy.get('[data-test-id="megamenu-header-buttons"]').find(`[value=${primary}]`).closest('button').click()

            cy.get('[data-test-id="megamenu-content"]').should('be.visible');
    
            cy.get('[data-test-id="megamenu-header-buttons"]').find(`[value=${primary}]`).closest('button').click()
    
            cy.get('[data-test-id="megamenu-content"]').should('not.exist');
        }
    });
    
    it('closes menu when close button is clicked', () => {
        for(let primary of Object.keys(this.preprocessedMegaMenuLinks)){
            cy.get('[data-test-id="megamenu-header-buttons"]').find(`[value=${primary}]`).closest('button').click()
            
            cy.get('[data-test-id="megamenu-content"]').should('be.visible');

            cy.get('[data-test-id="megamenu-close"]').click()
    
            cy.get('[data-test-id="megamenu-content"]').should('not.exist');
        }
    });
    
    it('opens child links', () => {
        for(let primary of Object.keys(this.preprocessedMegaMenuLinks)){
            cy.get('[data-test-id="megamenu-header-buttons"]').find(`[value=${primary}]`).closest('button').click()

            cy.get('[data-test-id="megamenu-content"]').should('be.visible');

            for(let secondary of this.preprocessedMegaMenuLinks[primary].links){
                if(secondary.links){
                    cy.contains(secondary.label).click()
                    for(let tertiary of secondary.links){
                        cy.contains(tertiary.label).should('be.visible');
                        if(tertiary.links){
                            cy.contains(tertiary.label).click()
                            for(let final of tertiary.links){
                                cy.contains(final.label).should('be.visible');
                            }
                        }
                    }
                }
            }
            
            cy.get('[data-test-id="megamenu-header-buttons"]').find(`[value=${primary}]`).closest('button').click()
    
            cy.get('[data-test-id="megamenu-content"]').should('not.exist');
        }
    });
});