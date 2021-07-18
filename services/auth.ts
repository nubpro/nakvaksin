import Cookies from 'js-cookie';

import { axInstance } from '../apis/nakvaksin.instance';

const USER_TOKEN = 'userToken';

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

async function logout() {
    Cookies.remove(USER_TOKEN);

    // const queryClient = useQueryClient();
    // queryClient.invalidateQueries('user');
}

function setUserToken(token: string) {
    Cookies.set(USER_TOKEN, token);
}

function getUserToken() {
    return Cookies.get(USER_TOKEN);
}

export { getUserToken, login, logout, resetPassword, setUserToken };
