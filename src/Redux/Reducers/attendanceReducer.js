import { ADD_ATTENDANCE_FAILURE, ADD_ATTENDANCE_REQUEST, ADD_ATTENDANCE_SUCCESS, DELETE_ATTENDANCE_FAILURE, DELETE_ATTENDANCE_REQUEST, DELETE_ATTENDANCE_SUCCESS, GET_ATTENDANCE_DETAIL_FAILURE, GET_ATTENDANCE_DETAIL_REQUEST, GET_ATTENDANCE_DETAIL_SUCCESS, GET_ATTENDANCE_LIST_FAILURE, GET_ATTENDANCE_LIST_REQUEST, GET_ATTENDANCE_LIST_SUCCESS, GET_ATTENDANCE_SUMMARY_FAILURE, GET_ATTENDANCE_SUMMARY_REQUEST, GET_ATTENDANCE_SUMMARY_SUCCESS, UPDATE_ATTENDANCE_STATUS_FAILURE, UPDATE_ATTENDANCE_STATUS_REQUEST, UPDATE_ATTENDANCE_STATUS_SUCCESS } from "../Constants/attendanceConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createAttendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ATTENDANCE_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_ATTENDANCE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_ATTENDANCE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const attendanceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ATTENDANCE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ATTENDANCE_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_ATTENDANCE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const attendanceDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ATTENDANCE_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ATTENDANCE_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_ATTENDANCE_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const attendanceSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ATTENDANCE_SUMMARY_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ATTENDANCE_SUMMARY_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_ATTENDANCE_SUMMARY_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateAttendanceStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ATTENDANCE_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_ATTENDANCE_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_ATTENDANCE_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteAttendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ATTENDANCE_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_ATTENDANCE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_ATTENDANCE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}