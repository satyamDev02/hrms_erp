import { ADD_EMPLOYEE_FAILURE, ADD_EMPLOYEE_REQUEST, ADD_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_FAILURE, DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, GET_EMPLOYEE_LIST_FAILURE, GET_EMPLOYEE_LIST_REQUEST, GET_EMPLOYEE_LIST_SUCCESS, UPDATE_EMPLOYEE_STATUS_FAILURE, UPDATE_EMPLOYEE_STATUS_REQUEST, UPDATE_EMPLOYEE_STATUS_SUCCESS, GET_EMPLOYEE_DETAIL_FAILURE, GET_EMPLOYEE_DETAIL_REQUEST, GET_EMPLOYEE_DETAIL_SUCCESS } from "../Constants/employeeConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMPLOYEE_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_EMPLOYEE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_EMPLOYEE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const employeeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_EMPLOYEE_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_EMPLOYEE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateEmployeeStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMPLOYEE_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_EMPLOYEE_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_EMPLOYEE_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_EMPLOYEE_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_EMPLOYEE_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_EMPLOYEE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const employeeDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_EMPLOYEE_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_EMPLOYEE_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}