import { apiController } from '../configs/apiController';
import { objectToQueryString } from '../utils/helper';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const createEmployee = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/employee/create/update`,
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

export const fetchEmployeeList = async (queryParams) => {
    try {
        const query = queryParams ? objectToQueryString(queryParams) : '';
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/employee/list` + query,
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


export const fetchEmployeeDetails = async (queryParams) => {
    try {
        const token = localStorage.getItem('access_token');
        const query = queryParams ? objectToQueryString(queryParams) : '';
        let config = {
            method: 'post',
            url: API_URL + `/employee/details` + query,
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
            url: API_URL + `/employee/status/update`,
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

export const deleteEmployeeApi = async (data) => {
    try {
        const token = localStorage.getItem('access_token');
        let config = {
            method: 'post',
            url: API_URL + `/employee/delete`,
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