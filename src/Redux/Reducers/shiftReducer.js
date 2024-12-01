import { ADD_SHIFT_FAILURE, ADD_SHIFT_REQUEST, ADD_SHIFT_SUCCESS, ASSIGN_SHIFT_FAILURE, ASSIGN_SHIFT_REQUEST, ASSIGN_SHIFT_SUCCESS, DELETE_ASSIGN_SHIFT_FAILURE, DELETE_ASSIGN_SHIFT_REQUEST, DELETE_ASSIGN_SHIFT_SUCCESS, DELETE_SHIFT_FAILURE, DELETE_SHIFT_REQUEST, DELETE_SHIFT_SUCCESS, GET_ASSIGN_SHIFT_DETAIL_FAILURE, GET_ASSIGN_SHIFT_DETAIL_REQUEST, GET_ASSIGN_SHIFT_DETAIL_SUCCESS, GET_ASSIGN_SHIFT_LIST_FAILURE, GET_ASSIGN_SHIFT_LIST_REQUEST, GET_ASSIGN_SHIFT_LIST_SUCCESS, GET_SHIFT_DETAIL_FAILURE, GET_SHIFT_DETAIL_REQUEST, GET_SHIFT_DETAIL_SUCCESS, GET_SHIFT_LIST_FAILURE, GET_SHIFT_LIST_REQUEST, GET_SHIFT_LIST_SUCCESS, UPDATE_SHIFT_STATUS_FAILURE, UPDATE_SHIFT_STATUS_REQUEST, UPDATE_SHIFT_STATUS_SUCCESS } from "../Constants/shiftConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};
export const createShiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SHIFT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_SHIFT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_SHIFT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const assignShiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case ASSIGN_SHIFT_REQUEST:
            return { ...state, loading: true, error: null };
        case ASSIGN_SHIFT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ASSIGN_SHIFT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const shiftListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHIFT_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_SHIFT_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_SHIFT_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const assignShiftListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ASSIGN_SHIFT_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ASSIGN_SHIFT_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_ASSIGN_SHIFT_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const shiftDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SHIFT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_SHIFT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_SHIFT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const asssignshiftDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ASSIGN_SHIFT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ASSIGN_SHIFT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_ASSIGN_SHIFT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}



export const updateShiftStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SHIFT_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_SHIFT_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_SHIFT_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteShiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_SHIFT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_SHIFT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_SHIFT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteAssignShiftReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ASSIGN_SHIFT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_ASSIGN_SHIFT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_ASSIGN_SHIFT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}