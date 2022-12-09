import UnauthorizedPage from '../../../src/lib/containers/UnauthorizedPage';

describe('RENDERS', () => {
    beforeEach(() => {
        cy.mount(<UnauthorizedPage />);
    })

    it('Renders', () => {
        cy.get('[data-test-id="unauthorized-page"]').should('exist').should('be.visible');
    });
});