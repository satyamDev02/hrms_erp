import { apiController } from '../configs/apiController';
import { objectToQueryString } from '../utils/helper';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const fetchCountries = async (queryParams) => {
    const query = queryParams ? objectToQueryString(queryParams) : '';
    try {
        let config = {
            method: 'post',
            url: API_URL + `/getcountry` + query,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
};

export const fetchStates = async (queryParams) => {
    const query = queryParams ? objectToQueryString(queryParams) : '';
    try {
        let config = {
            method: 'post',
            url: API_URL + `/getstate` + query,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
};

export const fetchCities = async (queryParams) => {
    const query = queryParams ? objectToQueryString(queryParams) : '';
    try {
        let config = {
            method: 'post',
            url: API_URL + `/getcity` + query,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
};
