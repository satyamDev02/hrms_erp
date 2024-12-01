import { ADD_DESIGNATION_FAILURE, ADD_DESIGNATION_REQUEST, ADD_DESIGNATION_SUCCESS, DELETE_DESIGNATION_FAILURE, DELETE_DESIGNATION_REQUEST, DELETE_DESIGNATION_SUCCESS, GET_DESIGNATION_DETAIL_FAILURE, GET_DESIGNATION_DETAIL_REQUEST, GET_DESIGNATION_DETAIL_SUCCESS, GET_DESIGNATION_LIST_FAILURE, GET_DESIGNATION_LIST_REQUEST, GET_DESIGNATION_LIST_SUCCESS, GET_EMPLOYEE_DESIGNATION_DETAIL_FAILURE, GET_EMPLOYEE_DESIGNATION_DETAIL_REQUEST, GET_EMPLOYEE_DESIGNATION_DETAIL_SUCCESS } from "../Constants/designationConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createDesignationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DESIGNATION_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_DESIGNATION_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_DESIGNATION_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const designationListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DESIGNATION_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DESIGNATION_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_DESIGNATION_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const designationDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DESIGNATION_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DESIGNATION_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_DESIGNATION_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const empDesignationDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_DESIGNATION_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_EMPLOYEE_DESIGNATION_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_EMPLOYEE_DESIGNATION_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteDesignationReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_DESIGNATION_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_DESIGNATION_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_DESIGNATION_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
