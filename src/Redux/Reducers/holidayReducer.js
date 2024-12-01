import {
    ADD_HOLIDAY_FAILURE,
    ADD_HOLIDAY_REQUEST,
    ADD_HOLIDAY_SUCCESS,

    GET_HOLIDAY_LIST_FAILURE,
    GET_HOLIDAY_LIST_REQUEST,
    GET_HOLIDAY_LIST_SUCCESS,

    UPDATE_HOLIDAY_STATUS_REQUEST,
    UPDATE_HOLIDAY_STATUS_SUCCESS,
    UPDATE_HOLIDAY_STATUS_FAILURE,

    GET_HOLIDAY_DETAIL_REQUEST,
    GET_HOLIDAY_DETAIL_SUCCESS,
    GET_HOLIDAY_DETAIL_FAILURE,

    DELETE_HOLIDAY_REQUEST,
    DELETE_HOLIDAY_SUCCESS,
    DELETE_HOLIDAY_FAILURE

} from "../Constants/holidayConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createHolidayReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_HOLIDAY_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_HOLIDAY_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_HOLIDAY_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const holidayListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOLIDAY_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_HOLIDAY_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_HOLIDAY_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const holidayDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOLIDAY_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_HOLIDAY_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_HOLIDAY_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateHolidayStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_HOLIDAY_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_HOLIDAY_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_HOLIDAY_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteHolidayReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_HOLIDAY_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_HOLIDAY_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_HOLIDAY_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}