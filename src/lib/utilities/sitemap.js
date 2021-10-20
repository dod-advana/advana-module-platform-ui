import { useCallback, useEffect, useState } from 'react';
import _ from 'underscore';
import axios from 'axios';
import Config from '../config/config';
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
			const response = await axios.get(window?.__env__?.REACT_APP_MEGA_MENU_ENDPOINT || process.env.REACT_APP_MEGA_MENU_ENDPOINT, { withCredentials: true });
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
	const updateMenuDataWithPermissionsCb = useCallback((obj) => {
		updateMenuDataWithPermissions(obj);
	}, []);
	return updateMenuDataWithPermissionsCb;
}

export function changePage(link) {
	if (link[0] === '#') {
		if (Config.MEGA_MENU_BASE_DOMAIN) {
			window.open(Config.MEGA_MENU_BASE_DOMAIN + '/' + link);
		} else {
			window.location.href = '/' + link;
		}
	} else {
		window.open(link);
	}
}

export function getDisplayedHref(link) {
	if (link[0] === '#') {
		if (Config.MEGA_MENU_BASE_DOMAIN) {
			return Config.MEGA_MENU_BASE_DOMAIN + (link || '#nolink');
		}
	}
	return link || '#nolink';
}

export function useMegaMenuLinks() {
	const updateMenuDataWithPermissions = useUpdateMenuDataWithPermissions();
	const [links, setLinks] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const fetchedLinks = await getLinks();
				updateMenuDataWithPermissions(fetchedLinks || {});
				setLinks(fetchedLinks || {});
			} catch (err) {
				console.error(err);
			}
		})();
	}, [updateMenuDataWithPermissions]);

	return links;
}

export function getDynamicHeaderButtons(menuDataWithPermissions = []) {
	const sortOrder = Config.MEGA_MENU_HEADER_SORT_ORDER.split(',').map(s => s.trim());
	return Object.keys(menuDataWithPermissions)
		.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b))
		.map((key) => ({
			value: key,
			label: key.toUpperCase(),
			link: menuDataWithPermissions[key].link,
		}));
};
