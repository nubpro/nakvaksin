import Cookies from 'js-cookie';

import { axInstance } from '../apis/nakvaksin.instance';

const COOKIE_USER_TOKEN = 'userToken';

async function login(username: string, password: string) {
    return axInstance({
        method: 'POST',
        url: '/login',
        data: {
            username,
            password
        }
    });
}

async function resetPassword(username: string) {
    // TODO: @CCK
}

function setUserToken(token: string) {
    Cookies.set(COOKIE_USER_TOKEN, token);
}

function getUserToken() {
    return Cookies.get(COOKIE_USER_TOKEN);
}

function clearUserToken() {
    return new Promise<void>((resolve) => {
        Cookies.remove(COOKIE_USER_TOKEN);
        resolve();
    });
}

export { clearUserToken, getUserToken, login, resetPassword, setUserToken };
