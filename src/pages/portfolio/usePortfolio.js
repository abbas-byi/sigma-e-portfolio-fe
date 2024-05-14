import axios from "axios";
import { useEffect, useState } from "react";

export const usePortfolio = () => {
    const [userDetails, setUserDetails] = useState({
        username: "",
        number: "",
        email: "",
    });

    const token = sessionStorage.getItem('token')
    const userId = sessionStorage.getItem('userId');
    useEffect(() => {
        getUserData();
    }, [token]);
    const getUserData = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}users/${userId}`,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            params: {
                userId,
            }
        }).then((res) => {
            setUserDetails({
                username: res.data.username,
                number: res.data.phone,
                email: res.data.email,
            })
        })
        return false;
    }

    return {
        userDetails
    }
};