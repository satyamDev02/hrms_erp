import {
    ADD_TRAINING_FAILURE,
    ADD_TRAINING_REQUEST,
    ADD_TRAINING_SUCCESS,

    GET_TRAINING_LIST_FAILURE,
    GET_TRAINING_LIST_REQUEST,
    GET_TRAINING_LIST_SUCCESS,

    UPDATE_TRAINING_STATUS_REQUEST,
    UPDATE_TRAINING_STATUS_SUCCESS,
    UPDATE_TRAINING_STATUS_FAILURE,

    GET_TRAINING_DETAIL_REQUEST,
    GET_TRAINING_DETAIL_SUCCESS,
    GET_TRAINING_DETAIL_FAILURE,

    DELETE_TRAINING_REQUEST,
    DELETE_TRAINING_SUCCESS,
    DELETE_TRAINING_FAILURE

} from "../Constants/trainingConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createTrainingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRAINING_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_TRAINING_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_TRAINING_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const trainingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAINING_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TRAINING_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TRAINING_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const trainingDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAINING_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TRAINING_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TRAINING_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateTrainingStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRAINING_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_TRAINING_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_TRAINING_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteTrainingReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_TRAINING_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_TRAINING_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_TRAINING_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}