import { createApplicant, deleteApplicantApi, fetchApplicantDetails, fetchApplicantList, updateStatus } from "../../services/applicant";
import { ADD_APPLICANT_FAILURE, ADD_APPLICANT_REQUEST, ADD_APPLICANT_SUCCESS, DELETE_APPLICANT_FAILURE, DELETE_APPLICANT_REQUEST, DELETE_APPLICANT_SUCCESS, GET_APPLICANT_DETAIL_FAILURE, GET_APPLICANT_DETAIL_REQUEST, GET_APPLICANT_DETAIL_SUCCESS, GET_APPLICANT_LIST_FAILURE, GET_APPLICANT_LIST_REQUEST, GET_APPLICANT_LIST_SUCCESS, UPDATE_APPLICANT_STATUS_FAILURE, UPDATE_APPLICANT_STATUS_REQUEST, UPDATE_APPLICANT_STATUS_SUCCESS } from "../Constants/applicantConstants";
import { toast } from "react-toastify";

export const createNewApplicant = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_APPLICANT_REQUEST });
        const { data } = await createApplicant(params);
        const { message, status } = data;
        dispatch({
            type: ADD_APPLICANT_SUCCESS,
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
                navigate("/applicant_list");
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
        dispatch({ type: ADD_APPLICANT_FAILURE, payload: error.message });
    }
};

export const getApplicantList = (params) => async dispatch => {
    dispatch({ type: GET_APPLICANT_LIST_REQUEST });
    try {
        const response = await fetchApplicantList(params);       
        dispatch({ type: GET_APPLICANT_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_APPLICANT_LIST_FAILURE, payload: error.message });
    }
};

export const getApplicantDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_APPLICANT_DETAIL_REQUEST });
    try {
        const response = await fetchApplicantDetails(params);
        dispatch({ type: GET_APPLICANT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_APPLICANT_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteApplicant = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_APPLICANT_REQUEST });
        const { data } = await deleteApplicantApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_APPLICANT_SUCCESS,
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
                navigate("/applicant_list");
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
        dispatch({ type: DELETE_APPLICANT_FAILURE, payload: error.message });
    }
};

export const updateApplicantStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_APPLICANT_STATUS_REQUEST });
        const { data } = await updateStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_APPLICANT_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_APPLICANT_STATUS_FAILURE, payload: error.message });
    }
};

