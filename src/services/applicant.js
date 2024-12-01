import { apiController } from '../configs/apiController';
import { objectToQueryString } from '../utils/helper';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const createApplicant = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/applicant/create/update`,
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

export const fetchApplicantList = async (queryParams) => {
    try {
        const query = queryParams ? objectToQueryString(queryParams) : '';
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/applicant/list` + query,
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


export const fetchApplicantDetails = async (queryParams) => {
    try {
        const token = localStorage.getItem('access_token');
        const query = queryParams ? objectToQueryString(queryParams) : '';
        let config = {
            method: 'post',
            url: API_URL + `/applicant/details` + query,
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

export const updateStatus = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/applicant/status/update`,
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

export const deleteApplicantApi = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/applicant/delete`,
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