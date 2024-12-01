import {
    ADD_DEPARTMENT_FAILURE,
    ADD_DEPARTMENT_REQUEST,
    ADD_DEPARTMENT_SUCCESS,

    GET_DEPARTMENT_LIST_FAILURE,
    GET_DEPARTMENT_LIST_REQUEST,
    GET_DEPARTMENT_LIST_SUCCESS,

  
    GET_DEPARTMENT_DETAIL_REQUEST,
    GET_DEPARTMENT_DETAIL_SUCCESS,
    GET_DEPARTMENT_DETAIL_FAILURE,

    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAILURE,
    GET_EMPLOYEE_DEPARTMENT_DETAIL_REQUEST,
    GET_EMPLOYEE_DEPARTMENT_DETAIL_SUCCESS,
    GET_EMPLOYEE_DEPARTMENT_DETAIL_FAILURE,
    GET_DEPARTMENT_PROJECT_DETAIL_REQUEST,
    GET_DEPARTMENT_PROJECT_DETAIL_SUCCESS,
    GET_DEPARTMENT_PROJECT_DETAIL_FAILURE

} from "../Constants/departmentConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createDepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEPARTMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_DEPARTMENT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_DEPARTMENT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const departmentListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPARTMENT_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DEPARTMENT_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_DEPARTMENT_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const departmentDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPARTMENT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DEPARTMENT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_DEPARTMENT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const empDepartmentDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_DEPARTMENT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_EMPLOYEE_DEPARTMENT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_EMPLOYEE_DEPARTMENT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const projectDepartmentDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPARTMENT_PROJECT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_DEPARTMENT_PROJECT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_DEPARTMENT_PROJECT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const deleteDepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_DEPARTMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_DEPARTMENT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_DEPARTMENT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}