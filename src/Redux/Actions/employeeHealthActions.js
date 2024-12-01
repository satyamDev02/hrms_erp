
import { toast } from "react-toastify";
import { createEmployeeHealth, deleteEmployeeHealthApi, fetchEmployeeHealthDetails, fetchEmployeeHealthList, updateEmployeeHealthStatusApi,  } from "../../services/employeeHealth";
import { ADD_EMP_HEALTH_FAILURE, ADD_EMP_HEALTH_REQUEST, DELETE_EMP_HEALTH_FAILURE, DELETE_EMP_HEALTH_REQUEST, DELETE_EMP_HEALTH_SUCCESS, GET_EMP_HEALTH_DETAIL_FAILURE, GET_EMP_HEALTH_DETAIL_REQUEST, GET_EMP_HEALTH_DETAIL_SUCCESS, GET_EMP_HEALTH_LIST_FAILURE, GET_EMP_HEALTH_LIST_REQUEST, GET_EMP_HEALTH_LIST_SUCCESS, UPDATE_EMP_HEALTH_STATUS_FAILURE, UPDATE_EMP_HEALTH_STATUS_REQUEST, UPDATE_EMP_HEALTH_STATUS_SUCCESS } from "../Constants/employeeHealthConstants";

export const createNewEmpHealth = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_EMP_HEALTH_REQUEST });
        const { data } = await createEmployeeHealth(params);
        const { message, status } = data;
        dispatch({
            type: ADD_EMP_HEALTH_FAILURE,
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
                navigate("/health");
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
        dispatch({ type: ADD_EMP_HEALTH_FAILURE, payload: error.message });
    }
};

export const getEmpHealthList = (params) => async (dispatch) => {
    dispatch({ type: GET_EMP_HEALTH_LIST_REQUEST });
    try {
        const response = await fetchEmployeeHealthList(params);
        dispatch({ type: GET_EMP_HEALTH_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_EMP_HEALTH_LIST_FAILURE, payload: error.message });
    }
};

export const getEmpHealthDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_EMP_HEALTH_DETAIL_REQUEST });
    try {
        const response = await fetchEmployeeHealthDetails(params);
        dispatch({ type: GET_EMP_HEALTH_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_EMP_HEALTH_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteEmpHealth = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EMP_HEALTH_REQUEST });
        const { data } = await deleteEmployeeHealthApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_EMP_HEALTH_SUCCESS,
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
                navigate("/health");
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
        dispatch({ type: DELETE_EMP_HEALTH_FAILURE, payload: error.message });
    }
};

export const updateEmpHealthStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EMP_HEALTH_STATUS_REQUEST });
        const { data } = await updateEmployeeHealthStatusApi(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_EMP_HEALTH_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_EMP_HEALTH_STATUS_FAILURE, payload: error.message });
    }
};
