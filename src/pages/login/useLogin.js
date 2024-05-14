import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const [loaderState, setLoaderState] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = () => {
        setLoaderState(true);
        axios({
            method: 'POST',
            params: {
                email: formData.email,
                password: formData.password,
            },
            url: `${process.env.REACT_APP_API_URL}auth/login`,
        }).then((res) => {
            setLoaderState(false);
            sessionStorage.setItem('token', res.data.tokens.access.token);
            sessionStorage.setItem('refreshToken', res.data.tokens.refresh.token);
            sessionStorage.setItem('tokenExpireDate', res.data.tokens.access.expires);
            sessionStorage.setItem('userId', res.data.user.id);
            navigate('/dashboard');
        }).catch(() => {
            setLoaderState(false);
            setErrMsg('Invalid email or password')
        })
    }

    return {
        handleSubmit,
        handleChange,
        formData,
        loaderState,
        errMsg,
    }
};