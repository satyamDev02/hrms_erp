import { ADD_TRAVEL_FAILURE, ADD_TRAVEL_REQUEST, ADD_TRAVEL_SUCCESS, DELETE_TRAVEL_FAILURE, DELETE_TRAVEL_REQUEST, DELETE_TRAVEL_SUCCESS, GET_TRAVEL_DETAIL_FAILURE, GET_TRAVEL_DETAIL_REQUEST, GET_TRAVEL_DETAIL_SUCCESS, GET_TRAVEL_HISTORY_DETAIL_FAILURE, GET_TRAVEL_HISTORY_DETAIL_REQUEST, GET_TRAVEL_HISTORY_DETAIL_SUCCESS, GET_TRAVEL_LIST_FAILURE, GET_TRAVEL_LIST_REQUEST, GET_TRAVEL_LIST_SUCCESS } from "../Constants/travelConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createTravelReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TRAVEL_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_TRAVEL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_TRAVEL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const travelListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAVEL_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TRAVEL_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TRAVEL_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const travelDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAVEL_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TRAVEL_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TRAVEL_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const travelHistoryDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRAVEL_HISTORY_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_TRAVEL_HISTORY_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_TRAVEL_HISTORY_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const deleteTravelReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_TRAVEL_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_TRAVEL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_TRAVEL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}