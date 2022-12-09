import _ from 'lodash'
import { updateMenuDataWithPermissions } from '../../../src/lib/utilities/sitemap';
import permissions from '../../../src/lib/utilities/permissions';

let permissionValidator
describe('PERMISSIONS', function () {
    before(() => {
        cy.fixture('preprocessedMegaMenuLinksShort.json').then((links) => {
			this.preprocessedMegaMenuLinks = links
		});
        
        cy.fixture('processedMegaMenuLinksShort.json').then((links) => {
			this.processedMegaMenuLinks = links
		});

        permissionValidator = permissions.permissionValidator;
        permissions.permissionValidator = () => 'test permission';
    })

    it('adds permissions to links object passed in', () => {
        const linksClone = _.cloneDeep(this.preprocessedMegaMenuLinks);
        updateMenuDataWithPermissions(linksClone, permissions);
        console.log(linksClone)
        expect(linksClone).to.deep.include(this.processedMegaMenuLinks);
    });

    after(() => {
        permissions.permissionValidator = permissionValidator;
    })
});