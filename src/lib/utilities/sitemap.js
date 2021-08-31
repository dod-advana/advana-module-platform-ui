import { useCallback } from 'react';
import _ from 'underscore';
import axios from 'axios';

import Permissions from './permissions';

export async function getLinks() {
	try {
		let data;

		try {
			data = JSON.parse(sessionStorage.getItem('advana-mega-menu'));
		} catch (err) {
			console.error(err);
		}

		if (!data) {
			const response = await axios.get(window?.__env__?.REACT_APP_MEGA_MENU_ENDPOINT || process.env.REACT_APP_MEGA_MENU_ENDPOINT);
			data = response?.data;
			sessionStorage.setItem('advana-mega-menu', JSON.stringify(data));
		}

		return data?.links || {};
	} catch (err) {
		console.error(err);
	}
}

export function updateMenuDataWithPermissions(obj) {
	Object.keys(obj).forEach((key) => {
		if (key === 'permission') {
			//Permission function exists in the spreadsheet, check the function if they have permission
			if (!_.isNull(obj[key])) {
				const permissionFunction = obj[key];
				obj[key] = Permissions?.[permissionFunction]?.();
			}
			//Permission function is blank in the spreadsheeet, default to true
			else {
				obj[key] = true;
			}
		}

		if (!_.isNull(obj[key]) && typeof obj[key] === 'object') {
			updateMenuDataWithPermissions(obj[key]);
		}
	});
}

export function useUpdateMenuDataWithPermissions() {
	const updateMenuDataWithPermissions = useCallback((obj) => {
		updateMenuDataWithPermissions
	}, []);
	return updateMenuDataWithPermissions;
}