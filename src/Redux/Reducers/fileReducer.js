import { ADD_FILE_FAILURE, ADD_FILE_REQUEST, ADD_FILE_SUCCESS, DELETE_FILE_FAILURE, DELETE_FILE_REQUEST, DELETE_FILE_SUCCESS, GET_FILE_DETAIL_FAILURE, GET_FILE_DETAIL_REQUEST, GET_FILE_DETAIL_SUCCESS, GET_FILE_LIST_FAILURE, GET_FILE_LIST_REQUEST, GET_FILE_LIST_SUCCESS } from "../Constants/fileConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createFileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILE_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_FILE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_FILE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const fileListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_FILE_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_FILE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const fileDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILE_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_FILE_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_FILE_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteFileReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_FILE_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_FILE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_FILE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}