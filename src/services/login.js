import { apiController } from '../configs/apiController';
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;


export const loginApi = async (data) => {
    try {
        let config = {
            method: 'post',
            url: API_URL + `/login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        const request = apiController(config);
        return request;
    } catch (error) {
        console.log(error);
    }
}

export async function setUserData(data) {
    localStorage.setItem("HRMS_USER_DATA", JSON.stringify(data));
}

// export async function getUserData() {
//     return JSON.parse(localStorage.getItem("HRMS_USER_DATA"));
// }

export function getUserData() {
    const userData = localStorage.getItem("HRMS_USER_DATA");
    return userData ? JSON.parse(userData) : null;
}
