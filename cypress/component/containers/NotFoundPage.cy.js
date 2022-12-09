import NotFoundPage from '../../../src/lib/containers/NotFoundPage';

describe('RENDERS', () => {
    beforeEach(() => {
        cy.mount(<NotFoundPage />);
    })

    it('Renders', () => {
        cy.get('[data-test-id="not-found-page"]').should('exist').should('be.visible');
    });

    it('Navigates Home', () => {
        cy.get('[data-test-id="not-found-page"]').should('exist').should('be.visible');
        cy.get('[href="#/"]').should('exist').should('be.visible');        
    });
});