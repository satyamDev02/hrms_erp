import {
    ADD_CLIENT_FAILURE,
    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS,

    GET_CLIENT_LIST_FAILURE,
    GET_CLIENT_LIST_REQUEST,
    GET_CLIENT_LIST_SUCCESS,

    UPDATE_CLIENT_STATUS_REQUEST,
    UPDATE_CLIENT_STATUS_SUCCESS,
    UPDATE_CLIENT_STATUS_FAILURE,

    GET_CLIENT_DETAIL_REQUEST,
    GET_CLIENT_DETAIL_SUCCESS,
    GET_CLIENT_DETAIL_FAILURE,

    DELETE_CLIENT_REQUEST,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAILURE,
    GET_CLIENT_PROJECT_DETAIL_REQUEST,
    GET_CLIENT_PROJECT_DETAIL_SUCCESS,
    GET_CLIENT_PROJECT_DETAIL_FAILURE

} from "../Constants/clientConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CLIENT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_CLIENT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_CLIENT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const clientListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLIENT_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_CLIENT_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_CLIENT_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const clientDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLIENT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_CLIENT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_CLIENT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const clientDetailProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLIENT_PROJECT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_CLIENT_PROJECT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_CLIENT_PROJECT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}


export const updateClientStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CLIENT_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_CLIENT_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_CLIENT_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteClientReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_CLIENT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_CLIENT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_CLIENT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}