import GenericErrorPage from '../../../src/lib/containers/GenericErrorPage';

describe('RENDERS', () => {
    beforeEach(() => {
        cy.mount(<GenericErrorPage />);
    })

    it('Renders', () => {
        cy.get('[data-test-id="error-page"]').should('exist').should('be.visible');
    });

    it('Navigates Home', () => {
        cy.get('[data-test-id="error-page"]').should('exist').should('be.visible');
        cy.get('[href="#/"]').should('exist').should('be.visible');        
    });
});