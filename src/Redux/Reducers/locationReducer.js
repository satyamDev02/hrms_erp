import { GET_CITY_LIST_FAILURE, GET_CITY_LIST_REQUEST, GET_CITY_LIST_SUCCESS, GET_COUNTRY_LIST_FAILURE, GET_COUNTRY_LIST_REQUEST, GET_COUNTRY_LIST_SUCCESS, GET_STATE_LIST_FAILURE, GET_STATE_LIST_REQUEST, GET_STATE_LIST_SUCCESS } from "../Constants/locationConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const countryListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRY_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_COUNTRY_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_COUNTRY_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const stateListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATE_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_STATE_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_STATE_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const cityListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CITY_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_CITY_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_CITY_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}