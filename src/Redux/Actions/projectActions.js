import { createProject, deleteProjectApi, fetchProjectDetails, fetchProjectList, updateProjectStatus } from "../../services/project";
import {
    ADD_PROJECT_FAILURE,
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_SUCCESS,

    GET_PROJECT_LIST_FAILURE,
    GET_PROJECT_LIST_REQUEST,
    GET_PROJECT_LIST_SUCCESS,

    GET_PROJECT_DETAIL_REQUEST,
    GET_PROJECT_DETAIL_SUCCESS,
    GET_PROJECT_DETAIL_FAILURE,

    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,

    UPDATE_PROJECT_STATUS_REQUEST,
    UPDATE_PROJECT_STATUS_SUCCESS,
    UPDATE_PROJECT_STATUS_FAILURE,

} from "../Constants/projectConstants";

import { toast } from "react-toastify";

export const createNewProject = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PROJECT_REQUEST });
        const { data } = await createProject(params);
        const { message, status } = data;
        dispatch({
            type: ADD_PROJECT_SUCCESS,
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
                navigate("/project");
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
        dispatch({ type: ADD_PROJECT_FAILURE, payload: error.message });
    }
};

export const getProjectList = (params) => async (dispatch) => {
    dispatch({ type: GET_PROJECT_LIST_REQUEST });
    try {
        const response = await fetchProjectList(params);
        dispatch({ type: GET_PROJECT_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_PROJECT_LIST_FAILURE, payload: error.message });
    }
};

export const getProjectDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_PROJECT_DETAIL_REQUEST });
    try {
        const response = await fetchProjectDetails(params);
        dispatch({ type: GET_PROJECT_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_PROJECT_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteProject = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PROJECT_REQUEST });
        const { data } = await deleteProjectApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_PROJECT_SUCCESS,
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
                navigate("/project");
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
        dispatch({ type: DELETE_PROJECT_FAILURE, payload: error.message });
    }
};

export const updateNewProjectStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROJECT_STATUS_REQUEST });
        const { data } = await updateProjectStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_PROJECT_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_PROJECT_STATUS_FAILURE, payload: error.message });
    }
};
