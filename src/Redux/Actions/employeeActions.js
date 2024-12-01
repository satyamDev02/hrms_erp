import { createEmployee, deleteEmployeeApi, fetchEmployeeDetails, fetchEmployeeList, updateStatus } from "../../services/employee";
import { ADD_EMPLOYEE_FAILURE, ADD_EMPLOYEE_REQUEST, ADD_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_FAILURE, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, GET_EMPLOYEE_DETAIL_FAILURE, GET_EMPLOYEE_DETAIL_REQUEST, GET_EMPLOYEE_DETAIL_SUCCESS, GET_EMPLOYEE_LIST_FAILURE, GET_EMPLOYEE_LIST_REQUEST, GET_EMPLOYEE_LIST_SUCCESS, UPDATE_EMPLOYEE_STATUS_FAILURE, UPDATE_EMPLOYEE_STATUS_REQUEST, UPDATE_EMPLOYEE_STATUS_SUCCESS } from "../Constants/employeeConstants";
import { toast } from "react-toastify";

export const createNewEmployee = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_EMPLOYEE_REQUEST });
        const { data } = await createEmployee(params);
        const { message, status } = data;
        dispatch({
            type: ADD_EMPLOYEE_SUCCESS,
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
                navigate("/all-employee-list");
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
        dispatch({ type: ADD_EMPLOYEE_FAILURE, payload: error.message });
    }
};

export const getEmployeeList = (params) => async dispatch => {
    dispatch({ type: GET_EMPLOYEE_LIST_REQUEST });
    try {
        const response = await fetchEmployeeList(params);       
        dispatch({ type: GET_EMPLOYEE_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_EMPLOYEE_LIST_FAILURE, payload: error.message });
    }
};

export const getEmployeeDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_EMPLOYEE_DETAIL_REQUEST });
    try {
        const response = await fetchEmployeeDetails(params);
        dispatch({ type: GET_EMPLOYEE_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_EMPLOYEE_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteEmployee = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_EMPLOYEE_REQUEST });
        const { data } = await deleteEmployeeApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_EMPLOYEE_SUCCESS,
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
                navigate("/all-employee-list");
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
        dispatch({ type: DELETE_EMPLOYEE_FAILURE, payload: error.message });
    }
};

export const updateEmployeeStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_EMPLOYEE_STATUS_REQUEST });
        const { data } = await updateStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_EMPLOYEE_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_EMPLOYEE_STATUS_FAILURE, payload: error.message });
    }
};

