import { createJob, deleteJob, fetchJobDetails, fetchJobList, updateJobStatus } from "../../services/job";
import {
    ADD_JOB_FAILURE,
    ADD_JOB_REQUEST,
    ADD_JOB_SUCCESS,

    GET_JOB_LIST_FAILURE,
    GET_JOB_LIST_REQUEST,
    GET_JOB_LIST_SUCCESS,

    GET_JOB_DETAIL_REQUEST,
    GET_JOB_DETAIL_SUCCESS,
    GET_JOB_DETAIL_FAILURE,

    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAILURE,

    UPDATE_JOB_STATUS_REQUEST,
    UPDATE_JOB_STATUS_SUCCESS,
    UPDATE_JOB_STATUS_FAILURE,

} from "../Constants/jobConstants";
import { toast } from "react-toastify";

export const createNewJob = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_JOB_REQUEST });
        const { data } = await createJob(params);
        const { message, status } = data;
        dispatch({
            type: ADD_JOB_SUCCESS,
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
                navigate("/all-job-list");
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
        dispatch({ type: ADD_JOB_FAILURE, payload: error.message });
    }
};

export const getJobList = (params) => async (dispatch) => {
    dispatch({ type: GET_JOB_LIST_REQUEST });
    try {
        const response = await fetchJobList(params);
        dispatch({ type: GET_JOB_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_JOB_LIST_FAILURE, payload: error.message });
    }
};

export const getJobDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_JOB_DETAIL_REQUEST });
    try {
        const response = await fetchJobDetails(params);
        dispatch({ type: GET_JOB_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_JOB_DETAIL_FAILURE, payload: error.message });
    }
};

export const deletejob = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_JOB_REQUEST });
        const { data } = await deleteJob(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_JOB_SUCCESS,
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
                navigate("/all-job-list");
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
        dispatch({ type: DELETE_JOB_FAILURE, payload: error.message });
    }
};

export const updateNewJobStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_JOB_STATUS_REQUEST });
        const { data } = await updateJobStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_JOB_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_JOB_STATUS_FAILURE, payload: error.message });
    }
};
