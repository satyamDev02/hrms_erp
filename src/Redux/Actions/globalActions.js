import { getUserByIdApi } from "../../services/globalApi";
import { GET_USER_BY_ID_FAILURE, GET_USER_BY_ID_REQUEST, GET_USER_BY_ID_SUCCESS } from "../Constants/globalConstants";

export const getUserById = (params) => async (dispatch) => {   
    dispatch({ type: GET_USER_BY_ID_REQUEST });
    try {
        const response = await getUserByIdApi(params);
        dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: GET_USER_BY_ID_FAILURE, payload: error.message });
    }
};