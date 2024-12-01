import axios from "axios";

export async function apiController(config) {
    return await axios(config);
}
