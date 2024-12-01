import { createDesignation, deleteDesignationApi, fetchDesignationDetails, fetchDesignationList, fetchEmpDesignationDetails } from "../../services/designation";
import { ADD_DESIGNATION_FAILURE, ADD_DESIGNATION_REQUEST, ADD_DESIGNATION_SUCCESS, DELETE_DESIGNATION_FAILURE, DELETE_DESIGNATION_REQUEST, DELETE_DESIGNATION_SUCCESS, GET_DESIGNATION_DETAIL_FAILURE, GET_DESIGNATION_DETAIL_REQUEST, GET_DESIGNATION_DETAIL_SUCCESS, GET_DESIGNATION_LIST_FAILURE, GET_DESIGNATION_LIST_REQUEST, GET_DESIGNATION_LIST_SUCCESS, GET_EMPLOYEE_DESIGNATION_DETAIL_FAILURE, GET_EMPLOYEE_DESIGNATION_DETAIL_REQUEST, GET_EMPLOYEE_DESIGNATION_DETAIL_SUCCESS } from "../Constants/designationConstants";
import { toast } from "react-toastify";

export const createNewDesignation = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADD_DESIGNATION_REQUEST });
        const { data } = await createDesignation(params);
        const { message, status } = data;
        dispatch({
            type: ADD_DESIGNATION_SUCCESS,
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
            return { success: true }
            // setTimeout(() => {
            //     navigate("/designation");
            // }, 1500);
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
        dispatch({ type: ADD_DESIGNATION_FAILURE, payload: error.message });
    }
};

export const getDesignationList = (params) => async dispatch => {
    dispatch({ type: GET_DESIGNATION_LIST_REQUEST });
    try {
        const response = await fetchDesignationList(params);
        dispatch({ type: GET_DESIGNATION_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_DESIGNATION_LIST_FAILURE, payload: error.message });
    }
};

export const getDesignationDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_DESIGNATION_DETAIL_REQUEST });
    try {
        const response = await fetchDesignationDetails(params);
        dispatch({ type: GET_DESIGNATION_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_DESIGNATION_DETAIL_FAILURE, payload: error.message });
    }
};

export const getEmpDesignationDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_EMPLOYEE_DESIGNATION_DETAIL_REQUEST });
    try {
        const response = await fetchEmpDesignationDetails(params);
        dispatch({ type: GET_EMPLOYEE_DESIGNATION_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_EMPLOYEE_DESIGNATION_DETAIL_FAILURE, payload: error.message });
    }
};
export const deleteDesignation = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_DESIGNATION_REQUEST });
        const { data } = await deleteDesignationApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_DESIGNATION_SUCCESS,
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
                navigate("/designation");
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
        dispatch({ type: DELETE_DESIGNATION_FAILURE, payload: error.message });
    }
};
