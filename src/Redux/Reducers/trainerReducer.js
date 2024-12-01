import {
    ADD_TRAINERS_FAILURE,
    ADD_TRAINERS_REQUEST,
    ADD_TRAINERS_SUCCESS,

    GET_TRAINERS_LIST_FAILURE,
    GET_TRAINERS_LIST_REQUEST,
    GET_TRAINERS_LIST_SUCCESS,

    UPDATE_TRAINERS_STATUS_REQUEST,
    UPDATE_TRAINERS_STATUS_SUCCESS,
    UPDATE_TRAINERS_STATUS_FAILURE,

    GET_TRAINERS_DETAIL_REQUEST,
    GET_TRAINERS_DETAIL_SUCCESS,
    GET_TRAINERS_DETAIL_FAILURE,

    DELETE_TRAINERS_REQUEST,
    DELETE_TRAINERS_SUCCESS,
    DELETE_TRAINERS_FAILURE,
    GET_TRAINERS_HISTORY_REQUEST,
    GET_TRAINERS_HISTORY_SUCCESS,
    GET_TRAINERS_HISTORY_FAILURE,


    

} from "../Constants/trainerConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createTrainerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRAINERS_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_TRAINERS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_TRAINERS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const trainerListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAINERS_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TRAINERS_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TRAINERS_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const trainerDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAINERS_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TRAINERS_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TRAINERS_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const updateTrainerStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TRAINERS_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case UPDATE_TRAINERS_STATUS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case UPDATE_TRAINERS_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const deleteTrainerReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_TRAINERS_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_TRAINERS_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_TRAINERS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const trainerHistoryDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAINERS_HISTORY_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TRAINERS_HISTORY_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TRAINERS_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}