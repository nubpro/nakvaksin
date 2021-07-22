import axios from 'axios';
import Cookies from 'js-cookie';

import { getUserToken, setUserToken } from '../services/auth';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

instance.interceptors.request.use((config) => {
    if (Cookies.get('userToken')) {
        config.headers['x-auth-token'] = getUserToken();
    }

    return config;
});

instance.interceptors.response.use((response) => {
    if (response.headers['x-auth-token']) {
        setUserToken(response.headers['x-auth-token']);
    }

    // TODO: if status code returns unauthorized (expired token),
    // clear userToken and kick user out to homepage

    return response;
});

export { instance as axInstance };
