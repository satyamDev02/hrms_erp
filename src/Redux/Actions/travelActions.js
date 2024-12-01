import { toast } from "react-toastify";
import { ADD_TRAVEL_FAILURE, ADD_TRAVEL_REQUEST, ADD_TRAVEL_SUCCESS, DELETE_TRAVEL_FAILURE, DELETE_TRAVEL_REQUEST, DELETE_TRAVEL_SUCCESS, GET_TRAVEL_DETAIL_FAILURE, GET_TRAVEL_DETAIL_REQUEST, GET_TRAVEL_DETAIL_SUCCESS, GET_TRAVEL_HISTORY_DETAIL_FAILURE, GET_TRAVEL_HISTORY_DETAIL_REQUEST, GET_TRAVEL_HISTORY_DETAIL_SUCCESS, GET_TRAVEL_LIST_FAILURE, GET_TRAVEL_LIST_REQUEST, GET_TRAVEL_LIST_SUCCESS } from "../Constants/travelConstants";
import { createTravel, deleteTravelApi, fetchTravelDetails, fetchTravelHistoryDetails, fetchTravelList } from "../../services/travel";

export const createNewTravel = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TRAVEL_REQUEST });
        const { data } = await createTravel(params);
        const { message, status } = data;
        dispatch({
            type: ADD_TRAVEL_SUCCESS,
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
                navigate("/travel");
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
        dispatch({ type: ADD_TRAVEL_FAILURE, payload: error.message });
    }
};

export const getTravelList = (params) => async (dispatch) => {
    dispatch({ type: GET_TRAVEL_LIST_REQUEST });
    try {
        const response = await fetchTravelList(params);
        dispatch({ type: GET_TRAVEL_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TRAVEL_LIST_FAILURE, payload: error.message });
    }
};

export const getTravelDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_TRAVEL_DETAIL_REQUEST });
    try {
        const response = await fetchTravelDetails(params);
        dispatch({ type: GET_TRAVEL_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TRAVEL_DETAIL_FAILURE, payload: error.message });
    }
};

export const getTravelHistoryDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_TRAVEL_HISTORY_DETAIL_REQUEST });
    try {
        const response = await fetchTravelHistoryDetails(params);
        dispatch({ type: GET_TRAVEL_HISTORY_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TRAVEL_HISTORY_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteTravel = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TRAVEL_REQUEST });
        const { data } = await deleteTravelApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_TRAVEL_SUCCESS,
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
                navigate("/travel");
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
        dispatch({ type: DELETE_TRAVEL_FAILURE, payload: error.message });
    }
};


