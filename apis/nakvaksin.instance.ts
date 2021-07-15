import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

instance.interceptors.request.use((config) => {
    if (Cookies.get('userToken')) {
        config.headers['x-auth-token'] = Cookies.get('userToken');
    }

    return config;
});

instance.interceptors.response.use((response) => {
    if (response.headers['x-auth-token']) {
        Cookies.set('userToken', response.headers['x-auth-token']);
    }

    return response;
});

export { instance as axInstance };
