import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useHeader = () => {
    const navigate = useNavigate();
    const logout = () => {
        axios({
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            },
            url: `${process.env.REACT_APP_API_URL}auth/logout`,
            params: {
                refreshToken: sessionStorage.getItem('refreshToken'),
            }
        }).then(() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('tokenExpireDate');
            sessionStorage.removeItem('userId');
            navigate('/login');
        }).catch((err) => {
            alert('Some error occurred, please close the application and try again')
        })
    };

    return {
        logout,
    }
};