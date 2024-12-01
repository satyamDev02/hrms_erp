import { GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "../Constants/globalConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const getUserByIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case GET_USER_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case GET_USER_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}
