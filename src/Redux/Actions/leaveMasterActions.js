import { toast } from "react-toastify";
import { createLeaveMaster, deleteLeaveMaster, fetchLeaveMasterDetails, fetchLeaveMasterList, updateLeaveMasterStatus } from "../../services/leaveMaster";
import { ADD_LEAVE_TYPE_FAILURE, ADD_LEAVE_TYPE_REQUEST, ADD_LEAVE_TYPE_SUCCESS, DELETE_LEAVE_TYPE_FAILURE, DELETE_LEAVE_TYPE_REQUEST, DELETE_LEAVE_TYPE_SUCCESS, GET_LEAVE_TYPE_DETAIL_FAILURE, GET_LEAVE_TYPE_DETAIL_REQUEST, GET_LEAVE_TYPE_DETAIL_SUCCESS, GET_LEAVE_TYPE_LIST_FAILURE, GET_LEAVE_TYPE_LIST_REQUEST, GET_LEAVE_TYPE_LIST_SUCCESS, UPDATE_LEAVE_TYPE_STATUS_FAILURE, UPDATE_LEAVE_TYPE_STATUS_REQUEST, UPDATE_LEAVE_TYPE_STATUS_SUCCESS } from "../Constants/leaveMasterConstants";

export const createNewLeaveType = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADD_LEAVE_TYPE_REQUEST });
        const { data } = await createLeaveMaster(params);
        const { message, status } = data;
        dispatch({
            type: ADD_LEAVE_TYPE_SUCCESS,
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
            return { success: false }
        }
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: ADD_LEAVE_TYPE_FAILURE, payload: error.message });
    }
};

export const getLeaveTypeList = (params) => async (dispatch) => {
    dispatch({ type: GET_LEAVE_TYPE_LIST_REQUEST });
    try {
        const response = await fetchLeaveMasterList(params);
        dispatch({ type: GET_LEAVE_TYPE_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_LEAVE_TYPE_LIST_FAILURE, payload: error.message });
    }
};

export const getLeaveTypeDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_LEAVE_TYPE_DETAIL_REQUEST });
    try {
        const response = await fetchLeaveMasterDetails(params);
        dispatch({ type: GET_LEAVE_TYPE_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_LEAVE_TYPE_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteLeaveType = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_LEAVE_TYPE_REQUEST });
        const { data } = await deleteLeaveMaster(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_LEAVE_TYPE_SUCCESS,
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
                navigate("/leave_type");
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
        dispatch({ type: DELETE_LEAVE_TYPE_FAILURE, payload: error.message });
    }
};

export const updateLeaveTypeStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_LEAVE_TYPE_STATUS_REQUEST });
        const { data } = await updateLeaveMasterStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_LEAVE_TYPE_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_LEAVE_TYPE_STATUS_FAILURE, payload: error.message });
    }
};
