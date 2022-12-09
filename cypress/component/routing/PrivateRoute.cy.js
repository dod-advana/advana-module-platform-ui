import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from '../../../src/lib/routing/PrivateRoute';
import UnauthorizedPage from '../../../src/lib/containers/UnauthorizedPage';

describe('Unauthorized', () => {
    beforeEach(() => {
        const allowFunction = () => false;
        const component = () => <h1 data-test-id="header">Private Route</h1>
        cy.mount(
            <div>
                <Router>
                    <PrivateRoute 
                        path="/"
                        allowFunction={allowFunction} 
                        component={component} />
                    <Route path="/unauthorized" component={UnauthorizedPage} />
                </Router>
            </div>
        );
    });

    it('Renders the unauthorized page', () => {
        cy.get('[data-test-id="unauthorized-page"]').should('exist').should('be.visible');
    });
});

describe('Authorized', () => {
    beforeEach(() => {
        const allowFunction = () => true;
        const component = () => <h1 data-test-id="header">Private Route</h1>
        cy.mount(
            <div>
                <Router>
                    <PrivateRoute 
                        path="/"
                        allowFunction={allowFunction} 
                        component={component} />
                    <Route path="/unauthorized" component={UnauthorizedPage} />
                </Router>
            </div>
        );
    });

    it('Renders the protected component', () => {
        cy.get('[data-test-id="header"]').should('exist').should('be.visible');
    });
})