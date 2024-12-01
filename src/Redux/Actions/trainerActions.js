import { toast } from "react-toastify";
import { createTrainer, deleteTrainerApi, fetchTrainerDetails, fetchTrainerHistoryDetails, fetchTrainerList, updateTrainerStatusApi } from "../../services/trainer";
import {
    ADD_TRAINERS_FAILURE,
    ADD_TRAINERS_REQUEST,
    ADD_TRAINERS_SUCCESS,

    DELETE_TRAINERS_FAILURE,
    DELETE_TRAINERS_REQUEST,
    DELETE_TRAINERS_SUCCESS,

    GET_TRAINERS_DETAIL_FAILURE,
    GET_TRAINERS_DETAIL_REQUEST,
    GET_TRAINERS_DETAIL_SUCCESS,

    GET_TRAINERS_HISTORY_FAILURE,
    GET_TRAINERS_HISTORY_REQUEST,
    
    GET_TRAINERS_HISTORY_SUCCESS,
    
    GET_TRAINERS_LIST_FAILURE,
    GET_TRAINERS_LIST_REQUEST,
    GET_TRAINERS_LIST_SUCCESS,
    UPDATE_TRAINERS_STATUS_FAILURE,
    UPDATE_TRAINERS_STATUS_REQUEST,
    UPDATE_TRAINERS_STATUS_SUCCESS
} from "../Constants/trainerConstants";

export const createNewTrainer = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TRAINERS_REQUEST });
        const { data } = await createTrainer(params);
        const { message, status } = data;
        dispatch({
            type: ADD_TRAINERS_SUCCESS,
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
                navigate("/trainers");
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
        dispatch({ type: ADD_TRAINERS_FAILURE, payload: error.message });
    }
};

export const getTrainerList = (params) => async (dispatch) => {
    dispatch({ type: GET_TRAINERS_LIST_REQUEST });
    try {
        const response = await fetchTrainerList(params);
        dispatch({ type: GET_TRAINERS_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TRAINERS_LIST_FAILURE, payload: error.message });
    }
};

export const getTrainerHistoryDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_TRAINERS_HISTORY_REQUEST });
    try {
        const response = await fetchTrainerHistoryDetails(params);
        dispatch({ type: GET_TRAINERS_HISTORY_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TRAINERS_HISTORY_FAILURE, payload: error.message });
    }
};

export const getTrainerDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_TRAINERS_DETAIL_REQUEST });
    try {
        const response = await fetchTrainerDetails(params);
        dispatch({ type: GET_TRAINERS_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TRAINERS_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteTrainer = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TRAINERS_REQUEST });
        const { data } = await deleteTrainerApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_TRAINERS_SUCCESS,
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
                navigate("/trainers");
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
        dispatch({ type: DELETE_TRAINERS_FAILURE, payload: error.message });
    }
};

export const updateTrainerStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TRAINERS_STATUS_REQUEST });
        const { data } = await updateTrainerStatusApi(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_TRAINERS_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_TRAINERS_STATUS_FAILURE, payload: error.message });
    }
};
