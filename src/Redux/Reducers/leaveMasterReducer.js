import { ADD_LEAVE_TYPE_FAILURE, ADD_LEAVE_TYPE_REQUEST, ADD_LEAVE_TYPE_SUCCESS, DELETE_LEAVE_TYPE_FAILURE, DELETE_LEAVE_TYPE_REQUEST, DELETE_LEAVE_TYPE_SUCCESS, GET_LEAVE_TYPE_DETAIL_FAILURE, GET_LEAVE_TYPE_DETAIL_REQUEST, GET_LEAVE_TYPE_DETAIL_SUCCESS, GET_LEAVE_TYPE_LIST_FAILURE, GET_LEAVE_TYPE_LIST_REQUEST, GET_LEAVE_TYPE_LIST_SUCCESS, UPDATE_LEAVE_TYPE_STATUS_FAILURE, UPDATE_LEAVE_TYPE_STATUS_REQUEST, UPDATE_LEAVE_TYPE_STATUS_SUCCESS } from "../Constants/leaveMasterConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createLeaveTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LEAVE_TYPE_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_LEAVE_TYPE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_LEAVE_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const leaveTypeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAVE_TYPE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_LEAVE_TYPE_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_LEAVE_TYPE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const leaveTypeDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAVE_TYPE_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_LEAVE_TYPE_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_LEAVE_TYPE_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateLeaveTypeStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LEAVE_TYPE_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_LEAVE_TYPE_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_LEAVE_TYPE_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteLeaveTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_LEAVE_TYPE_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_LEAVE_TYPE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_LEAVE_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}