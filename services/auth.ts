import axios from 'axios';
import Cookies from 'js-cookie';

import { axInstance } from '../apis/nakvaksin.instance';
import User from '../types/user';
import sanitizePhoneNumber from '../utils/sanitizePhoneNumber';

const COOKIE_USER_TOKEN = 'userToken';
const COOKIE_USER_PROFILE = 'userProfile';

async function login(username: string, password: string) {
    // Match phone numbers and format appropriately
    const phoneMatcher = /\d{10}/;
    if (phoneMatcher.test(username)) {
        if (username.charAt(0) === '+') {
            username = username.slice(1);
        } else if (username.charAt(0) === '0') {
            username = '6' + username;
        }
    }

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
    return axios({
        method: 'POST',
        url: '/api/resetpassword',
        data: {
            username: sanitizePhoneNumber(username)
        }
    });
}

function setUserToken(token: string) {
    Cookies.set(COOKIE_USER_TOKEN, token, { sameSite: 'Lax', expires: 90, path: '/' });
}

function getUserToken() {
    return Cookies.get(COOKIE_USER_TOKEN);
}

function clearUserToken() {
    Cookies.remove(COOKIE_USER_TOKEN);
}

function persistUserProfile(user: User) {
    Cookies.set(COOKIE_USER_PROFILE, user, { sameSite: 'Lax', expires: 90, path: '/' });
}

function destroyUserProfile() {
    Cookies.remove(COOKIE_USER_PROFILE);
}

export {
    clearUserToken,
    destroyUserProfile,
    getUserToken,
    login,
    persistUserProfile,
    resetPassword,
    setUserToken
};
