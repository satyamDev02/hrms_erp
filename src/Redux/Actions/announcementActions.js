import { toast } from "react-toastify";
import { createAnnouncement, deleteAnnouncementApi, fetchAnnouncementDetails, fetchAnnouncementList } from "../../services/announcement";
import { ADD_ANNOUNCEMENT_FAILURE, ADD_ANNOUNCEMENT_REQUEST, ADD_ANNOUNCEMENT_SUCCESS, DELETE_ANNOUNCEMENT_FAILURE, DELETE_ANNOUNCEMENT_REQUEST, DELETE_ANNOUNCEMENT_SUCCESS, GET_ANNOUNCEMENT_DETAIL_FAILURE, GET_ANNOUNCEMENT_DETAIL_REQUEST, GET_ANNOUNCEMENT_DETAIL_SUCCESS, GET_ANNOUNCEMENT_LIST_FAILURE, GET_ANNOUNCEMENT_LIST_REQUEST, GET_ANNOUNCEMENT_LIST_SUCCESS } from "../Constants/announcementConstants";

export const createNewAnnouncement = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_ANNOUNCEMENT_REQUEST });
        const { data } = await createAnnouncement(params);
        const { message, status } = data;
        dispatch({
            type: ADD_ANNOUNCEMENT_SUCCESS,
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
                navigate("/announcements");
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
        dispatch({ type: ADD_ANNOUNCEMENT_FAILURE, payload: error.message });
    }
};

export const getAnnouncementList = (params) => async (dispatch) => {
    dispatch({ type: GET_ANNOUNCEMENT_LIST_REQUEST });
    try {
        const response = await fetchAnnouncementList(params);
        dispatch({ type: GET_ANNOUNCEMENT_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ANNOUNCEMENT_LIST_FAILURE, payload: error.message });
    }
};

export const getAnnouncementDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_ANNOUNCEMENT_DETAIL_REQUEST });
    try {
        const response = await fetchAnnouncementDetails(params);
        dispatch({ type: GET_ANNOUNCEMENT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_ANNOUNCEMENT_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteAnnouncement = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ANNOUNCEMENT_REQUEST });
        const { data } = await deleteAnnouncementApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_ANNOUNCEMENT_SUCCESS,
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
                navigate("/announcements");
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
        dispatch({ type: DELETE_ANNOUNCEMENT_FAILURE, payload: error.message });
    }
};
