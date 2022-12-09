import './commands';
import 'cypress-mochawesome-reporter/register'; 
import { mount } from 'cypress/react';

Cypress.Commands.add('mount', mount);