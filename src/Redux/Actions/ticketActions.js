import { createTicket, deleteTicketApi, fetchTicketDetails, fetchTicketList, updateTicketStatus } from "../../services/ticket";
import { toast } from "react-toastify";
import { ADD_TICKET_FAILURE, ADD_TICKET_REQUEST, ADD_TICKET_SUCCESS, DELETE_TICKET_FAILURE, DELETE_TICKET_REQUEST, DELETE_TICKET_SUCCESS, GET_TICKET_DETAIL_FAILURE, GET_TICKET_DETAIL_REQUEST, GET_TICKET_DETAIL_SUCCESS, GET_TICKET_LIST_FAILURE, GET_TICKET_LIST_REQUEST, GET_TICKET_LIST_SUCCESS, UPDATE_TICKET_STATUS_FAILURE, UPDATE_TICKET_STATUS_REQUEST, UPDATE_TICKET_STATUS_SUCCESS } from "../Constants/ticketConstant";

export const createNewTicket = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TICKET_REQUEST });
        const { data } = await createTicket(params);
        const { message, status } = data;
        dispatch({
            type: ADD_TICKET_SUCCESS,
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
                navigate("/ticket");
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
        dispatch({ type: ADD_TICKET_FAILURE, payload: error.message });
    }
};

export const getTicketList = (params) => async (dispatch) => {
    dispatch({ type: GET_TICKET_LIST_REQUEST });
    try {
        const response = await fetchTicketList(params);
        dispatch({ type: GET_TICKET_LIST_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TICKET_LIST_FAILURE, payload: error.message });
    }
};

export const getTicketDetails = (params) => async (dispatch) => {
    dispatch({ type: GET_TICKET_DETAIL_REQUEST });
    try {
        const response = await fetchTicketDetails(params);
        dispatch({ type: GET_TICKET_DETAIL_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_TICKET_DETAIL_FAILURE, payload: error.message });
    }
};

export const deleteTicket = (params, navigate) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TICKET_REQUEST });
        const { data } = await deleteTicketApi(params);
        const { message, success } = data;
        dispatch({
            type: DELETE_TICKET_SUCCESS,
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
                navigate("/ticket");
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
        dispatch({ type: DELETE_TICKET_FAILURE, payload: error.message });
    }
};

export const updateNewTicketsStatus = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TICKET_STATUS_REQUEST });
        const { data } = await updateTicketStatus(params)
        const { message, success } = data;
        dispatch({
            type: UPDATE_TICKET_STATUS_SUCCESS,
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
        dispatch({ type: UPDATE_TICKET_STATUS_FAILURE, payload: error.message });
    }
};
