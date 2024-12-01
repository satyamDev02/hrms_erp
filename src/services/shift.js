import { apiController } from '../configs/apiController';
import { objectToQueryString } from '../utils/helper';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const createShift = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/shift/master/create/update`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export const assignShift = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/assing/shift/create/update`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export const fetchAssignShiftList = async (queryParams) => {
    try {
        const query = queryParams ? objectToQueryString(queryParams) : '';
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/assing/shift/list` + query,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export const fetchShiftList = async (queryParams) => {
    try {
        const query = queryParams ? objectToQueryString(queryParams) : '';
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/shift/master/list` + query,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export const fetchAssignShiftDetails = async (queryParams) => {
    try {
        const token = localStorage.getItem('access_token');
        const query = queryParams ? objectToQueryString(queryParams) : '';
        let config = {
            method: 'post',
            url: API_URL + `/shift/master/details` + query,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export const fetchShiftMasterDetails = async (queryParams) => {
    try {
        const token = localStorage.getItem('access_token');
        const query = queryParams ? objectToQueryString(queryParams) : '';
        let config = {
            method: 'post',
            url: API_URL + `/shift/master/details` + query,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export const updateShiftMasterStatus = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/shift/master/status/update`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export const deleteShiftMaster = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/shift/master/delete`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAssignShiftMaster = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/assing/shift/delete`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: data
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}