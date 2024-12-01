import { toast } from "react-toastify";
import { loginApi, setUserData } from "../../services/login";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../Constants/loginConstants";

export const login = (params) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const response = await loginApi(params);
        const { message, status } = response.data;
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.result,
        });
        if (response?.status === 200 && !response?.data?.error) {
            toast.success(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            localStorage.setItem('access_token', response.data.access_token);
            await setUserData(response.data.result);
            return { success: true }
        }
    } catch (error) {
        const message = error.response.data.message;
        toast.error(message || "Error during Create", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
        return { success: false }
    }
};
