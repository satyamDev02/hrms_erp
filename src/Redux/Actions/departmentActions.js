import { createDepartment,  fetchDepartmentDetails, fetchDepartmentList, deleteDepartmentApi, fetchEmpDepartmentDetails, fetchProjectDepartmentDetails } from "../../services/department";
import {
    ADD_DEPARTMENT_FAILURE,
    ADD_DEPARTMENT_REQUEST,
    ADD_DEPARTMENT_SUCCESS,

    GET_DEPARTMENT_LIST_FAILURE,
    GET_DEPARTMENT_LIST_REQUEST,
    GET_DEPARTMENT_LIST_SUCCESS,

    GET_DEPARTMENT_DETAIL_REQUEST,
    GET_DEPARTMENT_DETAIL_SUCCESS,
    GET_DEPARTMENT_DETAIL_FAILURE,

    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAILURE,

    UPDATE_DEPARTMENT_STATUS_REQUEST,
    UPDATE_DEPARTMENT_STATUS_SUCCESS,
    UPDATE_DEPARTMENT_STATUS_FAILURE,
    GET_EMPLOYEE_DEPARTMENT_DETAIL_REQUEST,
    GET_EMPLOYEE_DEPARTMENT_DETAIL_SUCCESS,
    GET_EMPLOYEE_DEPARTMENT_DETAIL_FAILURE,
    GET_DEPARTMENT_PROJECT_DETAIL_REQUEST,
    GET_DEPARTMENT_PROJECT_DETAIL_SUCCESS,
    GET_DEPARTMENT_PROJECT_DETAIL_FAILURE,

} from "../Constants/departmentConstants";
import { toast } from "react-toastify";

export const createNewDepartment = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADD_DEPARTMENT_REQUEST });
        const { data } = await createDepartment(params);
        const { message, status } = data;
        dispatch({
            type: ADD_DEPARTMENT_SUCCESS,
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
            //     navigate("/department");
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
        dispatch({ type: ADD_DEPARTMENT_FAILURE, payload: error.message });
    }
};

export const getDepartmentList = (params) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENT_LIST_REQUEST });
    try {
        const response = await fetchDepartmentList(params);
        dispatch({ type: GET_DEPARTMENT_LIST_SUCCESS, payload: response.data });
        
    } catch (error) {
        dispatch({ type: GET_DEPARTMENT_LIST_FAILURE, payload: error.message });
    }
};

export const getDepartmentDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENT_DETAIL_REQUEST });
    try {
        const response = await fetchDepartmentDetails(params);
        dispatch({ type: GET_DEPARTMENT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_DEPARTMENT_DETAIL_FAILURE, payload: error.message });
    }
};

export const getEmpDepartmentDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_EMPLOYEE_DEPARTMENT_DETAIL_REQUEST });
    try {
        const response = await fetchEmpDepartmentDetails(params);
        dispatch({ type: GET_EMPLOYEE_DEPARTMENT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_EMPLOYEE_DEPARTMENT_DETAIL_FAILURE, payload: error.message });
    }
};

export const getProjectDepartmentDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_DEPARTMENT_PROJECT_DETAIL_REQUEST });
    try {
        const response = await fetchProjectDepartmentDetails(params);
        dispatch({ type: GET_DEPARTMENT_PROJECT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_DEPARTMENT_PROJECT_DETAIL_FAILURE, payload: error.message });
    }
};
export const deleteDepartment = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_DEPARTMENT_REQUEST });
        const { data } = await deleteDepartmentApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_DEPARTMENT_SUCCESS,
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
                navigate("/department");
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
        dispatch({ type: DELETE_DEPARTMENT_FAILURE, payload: error.message });
    }
};


