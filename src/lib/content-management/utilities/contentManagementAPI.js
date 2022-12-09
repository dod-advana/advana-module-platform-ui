import axiosLib from 'axios';
import https from 'https';

const axios = axiosLib.create({
  baseURL: window?.__env__?.REACT_APP_API_ENDPOINT || process.env.REACT_APP_API_ENDPOINT,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

const BASE_URL = 'content-management';

const API_ENDPOINTS = {
	CONTENT_MANAGEMENT_GET: '/contentmanagement',
	CONTENT_MANAGEMENT_POST: '/contentmanagement',
	CONTENT_MANAGEMENT_BUTTONS: '/contentmanagementbuttons',
};

export const asyncContentManagementGET = async (page, section) => {
  const { data } = await axios.get(API_ENDPOINTS.CONTENT_MANAGEMENT_GET, { params: { page, section } });
  return data;
};

export const asyncContentManagementPOST = async (requestBody) => {
  const { data } = await axios.post(API_ENDPOINTS.CONTENT_MANAGEMENT_POST, requestBody);
  return data;
};

export const contentManagementGET = (page, section, callback, error) => {
	let endpoint = API_ENDPOINTS.CONTENT_MANAGEMENT_GET;
	endpoint += `?page=${page}&section=${section}`;
	axios.get(endpoint).then(callback).catch(error);
};

export const contentManagementPOST = (data, callback, error) => {
	axios
		.post(API_ENDPOINTS.CONTENT_MANAGEMENT_POST, data)
		.then(callback)
		.catch(error);
};

export const contentManagementEditPOST = async (requestBody) => {
  const { data } = await axios.post(API_ENDPOINTS.CONTENT_MANAGEMENT_POST_EDIT, requestBody);
  return data;
};

export const buttonLinkCmsGET = (page, buttonName, callback, error) => {
	let endpoint = API_ENDPOINTS.CONTENT_MANAGEMENT_BUTTONS;
	endpoint += `?page=${page}&buttonName=${buttonName}`;
	axios.get(endpoint).then(callback).catch(error);
};

export const buttonLinkCmsPOST = async (data) => axios.post(API_ENDPOINTS.CONTENT_MANAGEMENT_BUTTONS, { data });