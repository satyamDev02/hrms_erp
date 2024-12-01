
import { toast } from "react-toastify";
import { createAttendance, deleteAttendanceApi, fetchAttendanceDetails, fetchAttendanceList, fetchAttendanceSummary, updateAttendanceStatusApi } from "../../services/attendance";
import { ADD_ATTENDANCE_FAILURE, ADD_ATTENDANCE_REQUEST, ADD_ATTENDANCE_SUCCESS, DELETE_ATTENDANCE_FAILURE, DELETE_ATTENDANCE_REQUEST, DELETE_ATTENDANCE_SUCCESS, GET_ATTENDANCE_DETAIL_FAILURE, GET_ATTENDANCE_DETAIL_REQUEST, GET_ATTENDANCE_DETAIL_SUCCESS, GET_ATTENDANCE_LIST_FAILURE, GET_ATTENDANCE_LIST_REQUEST, GET_ATTENDANCE_LIST_SUCCESS, GET_ATTENDANCE_SUMMARY_FAILURE, GET_ATTENDANCE_SUMMARY_REQUEST, GET_ATTENDANCE_SUMMARY_SUCCESS, UPDATE_ATTENDANCE_STATUS_FAILURE, UPDATE_ATTENDANCE_STATUS_REQUEST, UPDATE_ATTENDANCE_STATUS_SUCCESS } from "../Constants/attendanceConstants";

export const createNewAttendance = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADD_ATTENDANCE_REQUEST });
        const { data } = await createAttendance(params);
        const { message, status } = data;
        dispatch({
            type: ADD_ATTENDANCE_SUCCESS,
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
        }
    } catch (error) {
        toast.error(error.message);
        dispatch({ type: ADD_ATTENDANCE_FAILURE, payload: error.message });
    }
};

export const getAttendanceList = (params) => async (dispatch) => {
    dispatch({ type: GET_ATTENDANCE_LIST_REQUEST });
    try {
        const response = await fetchAttendanceList(params);
        dispatch({ type: GET_ATTENDANCE_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ATTENDANCE_LIST_FAILURE, payload: error.message });
    }
};

export const getAttendanceDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_ATTENDANCE_DETAIL_REQUEST });
    try {
        const response = await fetchAttendanceDetails(params);
        dispatch({ type: GET_ATTENDANCE_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ATTENDANCE_DETAIL_FAILURE, payload: error.message });
    }
};

export const getAttendanceSummary = (params) => async (dispatch) => {
    dispatch({ type: GET_ATTENDANCE_SUMMARY_REQUEST });
    try {
        const response = await fetchAttendanceSummary(params);
        dispatch({ type: GET_ATTENDANCE_SUMMARY_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ATTENDANCE_SUMMARY_FAILURE, payload: error.message });
    }
};

export const deleteAttendance = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ATTENDANCE_REQUEST });
        const { data } = await deleteAttendanceApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_ATTENDANCE_SUCCESS,
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
                navigate("/all-attendance-list");
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
        dispatch({ type: DELETE_ATTENDANCE_FAILURE, payload: error.message });
    }
};

export const updateAttendanceStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ATTENDANCE_STATUS_REQUEST });
        const { data } = await updateAttendanceStatusApi(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_ATTENDANCE_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_ATTENDANCE_STATUS_FAILURE, payload: error.message });
    }
};
