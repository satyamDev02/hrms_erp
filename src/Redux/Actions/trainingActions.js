import { createTraining, deleteTrainingApi, fetchTrainingDetails, fetchTrainingList, updateTrainingStatusApi } from "../../services/training";
import {
    ADD_TRAINING_FAILURE,
    ADD_TRAINING_REQUEST,
    ADD_TRAINING_SUCCESS,

    GET_TRAINING_LIST_FAILURE,
    GET_TRAINING_LIST_REQUEST,
    GET_TRAINING_LIST_SUCCESS,

    GET_TRAINING_DETAIL_REQUEST,
    GET_TRAINING_DETAIL_SUCCESS,
    GET_TRAINING_DETAIL_FAILURE,

    DELETE_TRAINING_REQUEST,
    DELETE_TRAINING_SUCCESS,
    DELETE_TRAINING_FAILURE,

    UPDATE_TRAINING_STATUS_REQUEST,
    UPDATE_TRAINING_STATUS_SUCCESS,
    UPDATE_TRAINING_STATUS_FAILURE,

} from "../Constants/trainingConstants";

import { toast } from "react-toastify";

export const createNewTraining = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TRAINING_REQUEST });
        const { data } = await createTraining(params);
        const { message, status } = data;
        dispatch({
            type: ADD_TRAINING_SUCCESS,
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
                navigate("/training");
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
        dispatch({ type: ADD_TRAINING_FAILURE, payload: error.message });
    }
};

export const getTrainingList = (params) => async (dispatch) => {
    dispatch({ type: GET_TRAINING_LIST_REQUEST });
    try {
        const response = await fetchTrainingList(params);
        dispatch({ type: GET_TRAINING_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TRAINING_LIST_FAILURE, payload: error.message });
    }
};

export const getTrainingDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_TRAINING_DETAIL_REQUEST });
    try {
        const response = await fetchTrainingDetails(params);
        dispatch({ type: GET_TRAINING_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TRAINING_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteTraining = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TRAINING_REQUEST });
        const { data } = await deleteTrainingApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_TRAINING_SUCCESS,
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
                navigate("/training");
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
        dispatch({ type: DELETE_TRAINING_FAILURE, payload: error.message });
    }
};

export const updateTrainingStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TRAINING_STATUS_REQUEST });
        const { data } = await updateTrainingStatusApi(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_TRAINING_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_TRAINING_STATUS_FAILURE, payload: error.message });
    }
};
