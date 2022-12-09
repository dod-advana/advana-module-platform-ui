import advanaPermUtil from '../../utilities/permissions';
import PERMISSIONS from './permissionConstants';

const PermissionValidator = advanaPermUtil.permissionValidator;

export const allowEditCMS = (page) => PermissionValidator(PERMISSIONS.EDIT_CMS + page);
