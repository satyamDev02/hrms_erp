import { ADD_LEAVE_FAILURE, ADD_LEAVE_REQUEST, ADD_LEAVE_SUCCESS, DELETE_LEAVE_FAILURE, DELETE_LEAVE_REQUEST, DELETE_LEAVE_SUCCESS, GET_EMPLOYEE_LEAVE_DETAIL_FAILURE, GET_EMPLOYEE_LEAVE_DETAIL_REQUEST, GET_EMPLOYEE_LEAVE_DETAIL_SUCCESS, GET_LEAVE_DETAIL_FAILURE, GET_LEAVE_DETAIL_REQUEST, GET_LEAVE_DETAIL_SUCCESS, GET_LEAVE_LIST_FAILURE, GET_LEAVE_LIST_REQUEST, GET_LEAVE_LIST_SUCCESS, GET_LEAVE_SUMMARY_DETAIL_FAILURE, GET_LEAVE_SUMMARY_DETAIL_REQUEST, GET_LEAVE_SUMMARY_DETAIL_SUCCESS, GET_TODAY_LEAVE_LIST_FAILURE, GET_TODAY_LEAVE_LIST_REQUEST, GET_TODAY_LEAVE_LIST_SUCCESS, UPDATE_LEAVE_STATUS_FAILURE, UPDATE_LEAVE_STATUS_REQUEST, UPDATE_LEAVE_STATUS_SUCCESS } from "../Constants/leaveConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createLeaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LEAVE_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_LEAVE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_LEAVE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const leaveListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAVE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_LEAVE_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_LEAVE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const leaveDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAVE_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_LEAVE_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_LEAVE_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const empLeaveDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_LEAVE_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_EMPLOYEE_LEAVE_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_EMPLOYEE_LEAVE_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const leaveSummaryDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAVE_SUMMARY_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_LEAVE_SUMMARY_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_LEAVE_SUMMARY_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const updateLeaveStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LEAVE_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_LEAVE_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_LEAVE_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteLeaveReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_LEAVE_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_LEAVE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_LEAVE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const todayLeaveListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODAY_LEAVE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TODAY_LEAVE_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TODAY_LEAVE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}