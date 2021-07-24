import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';

import { clearUserToken, getUserToken, setUserToken } from '../services/auth';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

instance.interceptors.request.use((config) => {
    if (Cookies.get('userToken')) {
        config.headers['x-auth-token'] = getUserToken();
    }

    return config;
});

instance.interceptors.response.use(
    (response) => {
        if (response.headers['x-auth-token']) {
            setUserToken(response.headers['x-auth-token']);
        }

        return response;
    },
    (error) => {
        // unauthorized
        // if (error.response?.status === 401) {
        //     // clearUserToken();
        //     // TODO: redirect user to login
        // }

        return Promise.reject(error);
    }
);

export { instance as axInstance };
