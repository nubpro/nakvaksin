import { AxiosError } from 'axios';
import router from 'next/router';
import { useQuery, useQueryClient } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import {
    clearUserToken,
    destroyUserProfile,
    getUserToken,
    persistUserProfile
} from '../services/auth';
import User from '../types/user';

const QK_USER = 'user';

async function getUser() {
    if (getUserToken() == null) {
        return null;
    }

    const { data } = await axInstance({
        method: 'GET',
        url: '/profile'
    });

    return data;
}

const useUser = () => {
    const queryClient = useQueryClient();

    const { data: user } = useQuery<User, AxiosError>(QK_USER, getUser, {
        staleTime: 1000 * 60 * 60, // 1 hour
        retry: 0,
        onSuccess: (user) => {
            persistUserProfile(user);
        },
        onError: (error) => {
            if (error.response?.status === 400 || error.response?.status === 401) {
                logout(true);
            }
        }
    });

    const logout = (tokenExpired = false) => {
        clearUserToken();
        destroyUserProfile();
        queryClient.clear();

        if (tokenExpired) {
            router.replace('/login');
        } else {
            router.replace('/');
        }
    };

    return { user, logout };
};

export { useUser };
