import { assignShift, createShift, deleteAssignShiftMaster, deleteShiftMaster, fetchAssignShiftDetails, fetchAssignShiftList, fetchShiftList, fetchShiftMasterDetails, updateShiftMasterStatus } from "../../services/shift";
import { ADD_SHIFT_FAILURE, ADD_SHIFT_REQUEST, ADD_SHIFT_SUCCESS, ASSIGN_SHIFT_FAILURE, ASSIGN_SHIFT_REQUEST, ASSIGN_SHIFT_SUCCESS, DELETE_ASSIGN_SHIFT_FAILURE, DELETE_ASSIGN_SHIFT_REQUEST, DELETE_ASSIGN_SHIFT_SUCCESS, DELETE_SHIFT_REQUEST, DELETE_SHIFT_SUCCESS, GET_ASSIGN_SHIFT_DETAIL_FAILURE, GET_ASSIGN_SHIFT_DETAIL_REQUEST, GET_ASSIGN_SHIFT_DETAIL_SUCCESS, GET_ASSIGN_SHIFT_LIST_FAILURE, GET_ASSIGN_SHIFT_LIST_REQUEST, GET_ASSIGN_SHIFT_LIST_SUCCESS, GET_SHIFT_DETAIL_FAILURE, GET_SHIFT_DETAIL_REQUEST, GET_SHIFT_DETAIL_SUCCESS, GET_SHIFT_LIST_FAILURE, GET_SHIFT_LIST_REQUEST, GET_SHIFT_LIST_SUCCESS, UPDATE_SHIFT_STATUS_FAILURE, UPDATE_SHIFT_STATUS_REQUEST, UPDATE_SHIFT_STATUS_SUCCESS } from "../Constants/shiftConstants";
import { toast } from "react-toastify";

export const createNewShift = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADD_SHIFT_REQUEST });
        const { data } = await createShift(params)
        const { message, status } = data;
        dispatch({
            type: ADD_SHIFT_SUCCESS,
            payload: data
        });
        if (status === 200) {
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
        dispatch({ type: ADD_SHIFT_FAILURE, payload: error.message });
    }
};

export const assignNewShift = (params) => async (dispatch) => {
    try {
        dispatch({ type: ASSIGN_SHIFT_REQUEST });
        const { data } = await assignShift(params)
        const { message, status } = data;
        dispatch({
            type: ASSIGN_SHIFT_SUCCESS,
            payload: data
        });
        if (status === 200) {
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
        dispatch({ type: ASSIGN_SHIFT_FAILURE, payload: error.message });
    }
};

export const getShiftList = (params) => async dispatch => {
    dispatch({ type: GET_SHIFT_LIST_REQUEST });
    try {
        const response = await fetchShiftList(params);
        dispatch({ type: GET_SHIFT_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_SHIFT_LIST_FAILURE, payload: error.message });
    }
};

export const getAssignShiftList = (params) => async dispatch => {
    dispatch({ type: GET_ASSIGN_SHIFT_LIST_REQUEST });
    try {
        const response = await fetchAssignShiftList(params);
        dispatch({ type: GET_ASSIGN_SHIFT_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ASSIGN_SHIFT_LIST_FAILURE, payload: error.message });
    }
};

export const getShiftMasterDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_SHIFT_DETAIL_REQUEST });
    try {
        const response = await fetchShiftMasterDetails(params);
        dispatch({ type: GET_SHIFT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_SHIFT_DETAIL_FAILURE, payload: error.message });
    }
};

export const getShiftAssignMasterDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_ASSIGN_SHIFT_DETAIL_REQUEST });
    try {
        const response = await fetchAssignShiftDetails(params);
        dispatch({ type: GET_ASSIGN_SHIFT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ASSIGN_SHIFT_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteShift = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_SHIFT_REQUEST });
        const { data } = await deleteShiftMaster(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_SHIFT_SUCCESS,
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
                navigate("/new-shift");
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
        dispatch({ type: DELETE_PERFORMANCE_FAILURE, payload: error.message });
    }
};

export const deleteAssignShift = (params) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ASSIGN_SHIFT_REQUEST });
        const { data } = await deleteAssignShiftMaster(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_ASSIGN_SHIFT_SUCCESS,
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
        dispatch({ type: DELETE_ASSIGN_SHIFT_FAILURE, payload: error.message });
    }
};
export const updateNewShiftMasterStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SHIFT_STATUS_REQUEST });
        const { data } = await updateShiftMasterStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_SHIFT_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_SHIFT_STATUS_FAILURE, payload: error.message });
    }
};
