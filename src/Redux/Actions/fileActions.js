import { toast } from "react-toastify";
import { createFile, deleteFileApi, fetchFileDetails, fetchFileList } from "../../services/file";
import { ADD_FILE_FAILURE, ADD_FILE_REQUEST, ADD_FILE_SUCCESS, DELETE_FILE_FAILURE, DELETE_FILE_REQUEST, DELETE_FILE_SUCCESS, GET_FILE_DETAIL_FAILURE, GET_FILE_DETAIL_REQUEST, GET_FILE_DETAIL_SUCCESS, GET_FILE_LIST_FAILURE, GET_FILE_LIST_REQUEST, GET_FILE_LIST_SUCCESS } from "../Constants/fileConstants";

export const createNewFile = (params,navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_FILE_REQUEST });
        const { data } = await createFile(params);
        const { message, status } = data;
        dispatch({
            type: ADD_FILE_SUCCESS,
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
           setTimeout(() => {
               navigate("/file/employee");
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
        dispatch({ type: ADD_FILE_FAILURE, payload: error.message });
    }
};

export const getFileList = (params) => async (dispatch) => {
    dispatch({ type: GET_FILE_LIST_REQUEST });
    try {
        const response = await fetchFileList(params);
        dispatch({ type: GET_FILE_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_FILE_LIST_FAILURE, payload: error.message });
    }
};

export const getFileDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_FILE_DETAIL_REQUEST });
    try {
        const response = await fetchFileDetails(params);
        dispatch({ type: GET_FILE_DETAIL_SUCCESS , payload: response.data });
    } catch (error) {
        dispatch({ type: GET_FILE_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteFile = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_FILE_REQUEST });
        const { data } = await deleteFileApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_FILE_SUCCESS,
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
                navigate("/file/employee");
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
        dispatch({ type: DELETE_FILE_FAILURE, payload: error.message });
    }
};
