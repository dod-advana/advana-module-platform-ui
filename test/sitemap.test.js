import _ from 'lodash';
import { updateMenuDataWithPermissions } from '../src/lib/utilities/sitemap';
import preprocessedMegaMenuLinks from './test-data/preprocessedMegaMenuLinksShort';
import processedMegaMenuLinks from './test-data/processedMegaMenuLinksShort';

import permissions from '../src/lib/utilities/permissions';

let permissionValidator
beforeAll(() => {
	permissionValidator = permissions.permissionValidator;
	permissions.permissionValidator = jest.fn(() => 'test permission');
})

test('adds permissions to links object passed in', () => {
	const linksClone = _.cloneDeep(preprocessedMegaMenuLinks);
	updateMenuDataWithPermissions(linksClone, permissions);
	expect(linksClone).toEqual(processedMegaMenuLinks);
});

afterAll(() => {
	permissions.permissionValidator = permissionValidator;
})
