import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../Constants/loginConstants";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, error: null, data: action.payload }
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default: return state;
    }
}