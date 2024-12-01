import {
    ADD_PROJECT_FAILURE,
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_SUCCESS,

    GET_PROJECT_LIST_FAILURE,
    GET_PROJECT_LIST_REQUEST,
    GET_PROJECT_LIST_SUCCESS,

    UPDATE_PROJECT_STATUS_REQUEST,
    UPDATE_PROJECT_STATUS_SUCCESS,
    UPDATE_PROJECT_STATUS_FAILURE,

    GET_PROJECT_DETAIL_REQUEST,
    GET_PROJECT_DETAIL_SUCCESS,
    GET_PROJECT_DETAIL_FAILURE,

    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE

} from "../Constants/projectConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROJECT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_PROJECT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_PROJECT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const projectListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_PROJECT_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_PROJECT_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const projectDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_PROJECT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_PROJECT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateProjectStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROJECT_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_PROJECT_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_PROJECT_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PROJECT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_PROJECT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_PROJECT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}