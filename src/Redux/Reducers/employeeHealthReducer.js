import { ADD_EMP_HEALTH_FAILURE, ADD_EMP_HEALTH_REQUEST, ADD_EMP_HEALTH_SUCCESS, DELETE_EMP_HEALTH_FAILURE, DELETE_EMP_HEALTH_REQUEST, DELETE_EMP_HEALTH_SUCCESS, GET_EMP_HEALTH_DETAIL_FAILURE, GET_EMP_HEALTH_DETAIL_REQUEST, GET_EMP_HEALTH_DETAIL_SUCCESS, GET_EMP_HEALTH_LIST_FAILURE, GET_EMP_HEALTH_LIST_REQUEST, GET_EMP_HEALTH_LIST_SUCCESS, UPDATE_EMP_HEALTH_STATUS_FAILURE, UPDATE_EMP_HEALTH_STATUS_REQUEST, UPDATE_EMP_HEALTH_STATUS_SUCCESS } from "../Constants/employeeHealthConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createEmpHealthReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMP_HEALTH_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_EMP_HEALTH_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_EMP_HEALTH_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const empHealthListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMP_HEALTH_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_EMP_HEALTH_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_EMP_HEALTH_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const empHealthDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMP_HEALTH_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_EMP_HEALTH_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_EMP_HEALTH_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateEmpHealthStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMP_HEALTH_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_EMP_HEALTH_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_EMP_HEALTH_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteEmpHealthReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_EMP_HEALTH_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_EMP_HEALTH_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_EMP_HEALTH_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}