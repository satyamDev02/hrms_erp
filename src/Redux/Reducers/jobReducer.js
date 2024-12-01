import {
    ADD_JOB_FAILURE,
    ADD_JOB_REQUEST,
    ADD_JOB_SUCCESS,

    GET_JOB_LIST_FAILURE,
    GET_JOB_LIST_REQUEST,
    GET_JOB_LIST_SUCCESS,

    UPDATE_JOB_STATUS_REQUEST,
    UPDATE_JOB_STATUS_SUCCESS,
    UPDATE_JOB_STATUS_FAILURE,

    GET_JOB_DETAIL_REQUEST,
    GET_JOB_DETAIL_SUCCESS,
    GET_JOB_DETAIL_FAILURE,

    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAILURE

} from "../Constants/jobConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_JOB_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_JOB_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_JOB_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const jobListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOB_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_JOB_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_JOB_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const jobDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOB_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_JOB_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_JOB_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateJobStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_JOB_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_JOB_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_JOB_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_JOB_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_JOB_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_JOB_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}