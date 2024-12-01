import { createClient, deleteClient, fetchClientDetails, fetchClientList, fetchClientProjectDetails, updateClientStatus } from "../../services/client";
import {
    ADD_CLIENT_FAILURE,
    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS,

    GET_CLIENT_LIST_FAILURE,
    GET_CLIENT_LIST_REQUEST,
    GET_CLIENT_LIST_SUCCESS,

    GET_CLIENT_DETAIL_REQUEST,
    GET_CLIENT_DETAIL_SUCCESS,
    GET_CLIENT_DETAIL_FAILURE,

    DELETE_CLIENT_REQUEST,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAILURE,

    UPDATE_CLIENT_STATUS_REQUEST,
    UPDATE_CLIENT_STATUS_SUCCESS,
    UPDATE_CLIENT_STATUS_FAILURE,
    GET_CLIENT_PROJECT_DETAIL_REQUEST,
    GET_CLIENT_PROJECT_DETAIL_FAILURE,
    GET_CLIENT_PROJECT_DETAIL_SUCCESS,

} from "../Constants/clientConstants";
import { toast } from "react-toastify";

export const createNewClient = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_CLIENT_REQUEST });
        const { data } = await createClient(params);
        const { message, status } = data;
        dispatch({
            type: ADD_CLIENT_SUCCESS,
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
                navigate("/client");
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
        dispatch({ type: ADD_CLIENT_FAILURE, payload: error.message });
    }
};

export const getClientList = (params) => async (dispatch) => {
    dispatch({ type: GET_CLIENT_LIST_REQUEST });
    try {
        const response = await fetchClientList(params);
        dispatch({ type: GET_CLIENT_LIST_SUCCESS, payload: response.data });
        
    } catch (error) {
        dispatch({ type: GET_CLIENT_LIST_FAILURE, payload: error.message });
    }
};

export const getClientDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_CLIENT_DETAIL_REQUEST });
    try {
        const response = await fetchClientDetails(params);
        dispatch({ type: GET_CLIENT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_CLIENT_DETAIL_FAILURE, payload: error.message });
    }
};

export const getClientProjectDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_CLIENT_PROJECT_DETAIL_REQUEST });
    try {
        const response = await fetchClientProjectDetails(params);
        dispatch({ type: GET_CLIENT_PROJECT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_CLIENT_PROJECT_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteclient = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CLIENT_REQUEST });
        const { data } = await deleteClient(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_CLIENT_SUCCESS,
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
                navigate("/client");
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
        dispatch({ type: DELETE_CLIENT_FAILURE, payload: error.message });
    }
};

export const updateNewClientStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CLIENT_STATUS_REQUEST });
        const { data } = await updateClientStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_CLIENT_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_CLIENT_STATUS_FAILURE, payload: error.message });
    }
};
