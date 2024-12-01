import { ADD_ANNOUNCEMENT_FAILURE, ADD_ANNOUNCEMENT_REQUEST, ADD_ANNOUNCEMENT_SUCCESS, DELETE_ANNOUNCEMENT_FAILURE, DELETE_ANNOUNCEMENT_REQUEST, DELETE_ANNOUNCEMENT_SUCCESS, GET_ANNOUNCEMENT_DETAIL_FAILURE, GET_ANNOUNCEMENT_DETAIL_REQUEST, GET_ANNOUNCEMENT_DETAIL_SUCCESS, GET_ANNOUNCEMENT_LIST_FAILURE, GET_ANNOUNCEMENT_LIST_REQUEST, GET_ANNOUNCEMENT_LIST_SUCCESS } from "../Constants/announcementConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const createAnnouncementReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ANNOUNCEMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_ANNOUNCEMENT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case ADD_ANNOUNCEMENT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
export const announcementListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ANNOUNCEMENT_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ANNOUNCEMENT_LIST_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_ANNOUNCEMENT_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}

export const announcementDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ANNOUNCEMENT_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_ANNOUNCEMENT_DETAIL_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_ANNOUNCEMENT_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}


export const deleteAnnouncementReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ANNOUNCEMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case DELETE_ANNOUNCEMENT_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case DELETE_ANNOUNCEMENT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}