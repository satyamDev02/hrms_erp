import { toast } from "react-toastify";
import { createLeave, deleteLeaveApi, fetchEmpLeaveDetails, fetchLeaveDetails, fetchLeaveList, fetchLeaveSummaryDetails, fetchTodayLeaveList, updateLeaveStatusApi } from "../../services/leave";
import { ADD_LEAVE_FAILURE, ADD_LEAVE_REQUEST, ADD_LEAVE_SUCCESS, DELETE_LEAVE_FAILURE, DELETE_LEAVE_REQUEST, DELETE_LEAVE_SUCCESS, GET_EMPLOYEE_LEAVE_DETAIL_FAILURE, GET_EMPLOYEE_LEAVE_DETAIL_REQUEST, GET_EMPLOYEE_LEAVE_DETAIL_SUCCESS, GET_LEAVE_DETAIL_FAILURE, GET_LEAVE_DETAIL_REQUEST, GET_LEAVE_DETAIL_SUCCESS, GET_LEAVE_LIST_FAILURE, GET_LEAVE_LIST_REQUEST, GET_LEAVE_LIST_SUCCESS, GET_LEAVE_SUMMARY_DETAIL_FAILURE, GET_LEAVE_SUMMARY_DETAIL_REQUEST, GET_LEAVE_SUMMARY_DETAIL_SUCCESS, GET_TODAY_LEAVE_LIST_FAILURE, GET_TODAY_LEAVE_LIST_REQUEST, GET_TODAY_LEAVE_LIST_SUCCESS, UPDATE_LEAVE_STATUS_FAILURE, UPDATE_LEAVE_STATUS_REQUEST, UPDATE_LEAVE_STATUS_SUCCESS } from "../Constants/leaveConstants";

export const createNewLeave = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_LEAVE_REQUEST });
        const { data } = await createLeave(params);
        const { message, status } = data;
        dispatch({
            type: ADD_LEAVE_SUCCESS,
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
                navigate("/all-leave");
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
        dispatch({ type: ADD_LEAVE_FAILURE, payload: error.message });
    }
};

export const getLeaveList = (params) => async (dispatch) => {
    dispatch({ type: GET_LEAVE_LIST_REQUEST });
    try {
        const response = await fetchLeaveList(params);
        dispatch({ type: GET_LEAVE_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_LEAVE_LIST_FAILURE, payload: error.message });
    }
};

export const getLeaveDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_LEAVE_DETAIL_REQUEST });
    try {
        const response = await fetchLeaveDetails(params);
        dispatch({ type: GET_LEAVE_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_LEAVE_DETAIL_FAILURE, payload: error.message });
    }
};

export const getEmpLeaveDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_EMPLOYEE_LEAVE_DETAIL_REQUEST });
    try {
        const response = await fetchEmpLeaveDetails(params);
        dispatch({ type: GET_EMPLOYEE_LEAVE_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_EMPLOYEE_LEAVE_DETAIL_FAILURE, payload: error.message });
    }
};

export const getLeaveSummaryDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_LEAVE_SUMMARY_DETAIL_REQUEST });
    try {
        const response = await fetchLeaveSummaryDetails(params);
        dispatch({ type: GET_LEAVE_SUMMARY_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_LEAVE_SUMMARY_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteLeave = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_LEAVE_REQUEST });
        const { data } = await deleteLeaveApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_LEAVE_SUCCESS,
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
                navigate("/all-leave");
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
        dispatch({ type: DELETE_LEAVE_FAILURE, payload: error.message });
    }
};

export const updateLeaveStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_LEAVE_STATUS_REQUEST });
        const { data } = await updateLeaveStatusApi(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_LEAVE_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_LEAVE_STATUS_FAILURE, payload: error.message });
    }
};

export const getTodayLeaveList = (params) => async (dispatch) => {
    dispatch({ type: GET_TODAY_LEAVE_LIST_REQUEST });
    try {
        const response = await fetchTodayLeaveList(params);
        dispatch({ type: GET_TODAY_LEAVE_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TODAY_LEAVE_LIST_FAILURE, payload: error.message });
    }
};