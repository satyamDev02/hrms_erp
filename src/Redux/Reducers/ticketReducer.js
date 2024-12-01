import { ADD_TICKET_FAILURE, ADD_TICKET_REQUEST, ADD_TICKET_SUCCESS, DELETE_TICKET_FAILURE, DELETE_TICKET_REQUEST, DELETE_TICKET_SUCCESS, GET_TICKET_DETAIL_FAILURE, GET_TICKET_DETAIL_REQUEST, GET_TICKET_DETAIL_SUCCESS, GET_TICKET_LIST_FAILURE, GET_TICKET_LIST_REQUEST, GET_TICKET_LIST_SUCCESS, UPDATE_TICKET_STATUS_FAILURE, UPDATE_TICKET_STATUS_REQUEST, UPDATE_TICKET_STATUS_SUCCESS } from "../Constants/ticketConstant";


const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createTicketReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TICKET_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_TICKET_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_TICKET_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const ticketListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TICKET_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TICKET_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TICKET_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const ticketDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TICKET_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TICKET_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TICKET_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateTicketStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TICKET_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_TICKET_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_TICKET_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteTicketReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_TICKET_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_TICKET_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_TICKET_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}