
import { toast } from "react-toastify";
import { GET_CITY_LIST_FAILURE, GET_CITY_LIST_REQUEST, GET_CITY_LIST_SUCCESS, GET_COUNTRY_LIST_FAILURE, GET_COUNTRY_LIST_REQUEST, GET_COUNTRY_LIST_SUCCESS, GET_STATE_LIST_FAILURE, GET_STATE_LIST_REQUEST, GET_STATE_LIST_SUCCESS } from "../Constants/locationConstants";
import { fetchCities, fetchCountries, fetchStates } from "../../services/location";

export const getCountryList = (params) => async (dispatch) => {
    try {
        dispatch({ type: GET_COUNTRY_LIST_REQUEST });
        const response = await fetchCountries(params);
        dispatch({ type: GET_COUNTRY_LIST_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: GET_COUNTRY_LIST_FAILURE, payload: error.message });
    }
};

export const getStateList = (params) => async (dispatch) => {
    dispatch({ type: GET_STATE_LIST_REQUEST });
    try {
        const response = await fetchStates(params);
        dispatch({ type: GET_STATE_LIST_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        dispatch({ type: GET_STATE_LIST_FAILURE, payload: error.message });
    }
};

export const getCityList = (params) => async (dispatch) => {
    dispatch({ type: GET_CITY_LIST_REQUEST });
    try {
        const response = await fetchCities(params);
        dispatch({ type: GET_CITY_LIST_SUCCESS, payload: response.data });
        return response;
    } catch (error) {
        dispatch({ type: GET_CITY_LIST_FAILURE, payload: error.message });
    }
};