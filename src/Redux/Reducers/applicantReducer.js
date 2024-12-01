import { ADD_APPLICANT_FAILURE, ADD_APPLICANT_REQUEST, ADD_APPLICANT_SUCCESS, DELETE_APPLICANT_FAILURE, DELETE_APPLICANT_REQUEST, DELETE_APPLICANT_SUCCESS, GET_APPLICANT_LIST_FAILURE, GET_APPLICANT_LIST_REQUEST, GET_APPLICANT_LIST_SUCCESS, UPDATE_APPLICANT_STATUS_FAILURE, UPDATE_APPLICANT_STATUS_REQUEST, UPDATE_APPLICANT_STATUS_SUCCESS, GET_APPLICANT_DETAIL_FAILURE, GET_APPLICANT_DETAIL_REQUEST, GET_APPLICANT_DETAIL_SUCCESS } from "../Constants/applicantConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createApplicantReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_APPLICANT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_APPLICANT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_APPLICANT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const applicantListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPLICANT_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_APPLICANT_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_APPLICANT_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateApplicantStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APPLICANT_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_APPLICANT_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_APPLICANT_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteApplicantReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_APPLICANT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_APPLICANT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_APPLICANT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const applicantDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPLICANT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_APPLICANT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_APPLICANT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}