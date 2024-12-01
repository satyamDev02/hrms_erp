import { createHoliday, deleteHoliday, fetchHolidayDetails, fetchHolidayList, updateHolidayStatus } from "../../services/holiday";
import {
    ADD_HOLIDAY_FAILURE,
    ADD_HOLIDAY_REQUEST,
    ADD_HOLIDAY_SUCCESS,

    GET_HOLIDAY_LIST_FAILURE,
    GET_HOLIDAY_LIST_REQUEST,
    GET_HOLIDAY_LIST_SUCCESS,

    GET_HOLIDAY_DETAIL_REQUEST,
    GET_HOLIDAY_DETAIL_SUCCESS,
    GET_HOLIDAY_DETAIL_FAILURE,

    DELETE_HOLIDAY_REQUEST,
    DELETE_HOLIDAY_SUCCESS,
    DELETE_HOLIDAY_FAILURE,

    UPDATE_HOLIDAY_STATUS_REQUEST,
    UPDATE_HOLIDAY_STATUS_SUCCESS,
    UPDATE_HOLIDAY_STATUS_FAILURE,

} from "../Constants/holidayConstants";
import { toast } from "react-toastify";

export const createNewHoliday = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_HOLIDAY_REQUEST });
        const { data } = await createHoliday(params);
        const { message, status } = data;
        dispatch({
            type: ADD_HOLIDAY_SUCCESS,
            payload: data,
        });
        if (status === 200) {
             toast.success(message || "Created successfully.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // return { success: true }
            setTimeout(() => {
                navigate("/holiday");
            }, 1500);
        } else {
            toast.error(message || "Error during Create", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: ADD_HOLIDAY_FAILURE, payload: error.message });
    }
};

export const getHolidayList = (params) => async (dispatch) => {
    dispatch({ type: GET_HOLIDAY_LIST_REQUEST });
    try {
        const response = await fetchHolidayList(params);
        dispatch({ type: GET_HOLIDAY_LIST_SUCCESS, payload: response.data });
        console.log('rrrrrrrrrrr', response)
    } catch (error) {
        dispatch({ type: GET_HOLIDAY_LIST_FAILURE, payload: error.message });
    }
};

export const getHolidayDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_HOLIDAY_DETAIL_REQUEST });
    try {
        const response = await fetchHolidayDetails(params);
        dispatch({ type: GET_HOLIDAY_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_HOLIDAY_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteholiday = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_HOLIDAY_REQUEST });
        const { data } = await deleteHoliday(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_HOLIDAY_SUCCESS,
            payload: data,
        });
        if (success) {
            toast.success(message || "Created successfully.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                navigate("/holiday");
            }, 1500);
            return { success: true }
        } else {
            toast.error(message || "Error during Delete", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // return { success: false }
        }
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: DELETE_HOLIDAY_FAILURE, payload: error.message });
    }
};

export const updateNewHolidayStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_HOLIDAY_STATUS_REQUEST });
        const { data } = await updateHolidayStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_HOLIDAY_STATUS_SUCCESS,
            payload: data
        });
        if (success) {
            toast.success(message || 'Created successfully.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return { success: true };
        }
        else {
            toast.error(message || 'Error during create', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return { success: false };
        }
    } catch (error) {
        toast.error(error.message)
        dispatch({ type: UPDATE_HOLIDAY_STATUS_FAILURE, payload: error.message });
    }
};
