import axios from "axios"

export const apiCalls = async (method, apiUrl, params = {}) => {
    const token = sessionStorage.getItem("token");

    const response = await axios({
        method,
        headers: {
            Authorization: 'Bearer ' + token
        },
        url: `${process.env.REACT_APP_API_URL}${apiUrl}`,
        params,
    });

    return response;
}