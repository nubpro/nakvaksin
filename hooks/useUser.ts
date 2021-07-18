import { useQuery } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import { getUserToken } from '../services/auth';
import User from '../types/user';

async function getUser() {
    if (getUserToken() == null) {
        return null;
    }

    const resp = await axInstance({
        method: 'GET',
        url: '/profile'
    });
    const { user } = resp.data;

    return user;
}

const useUser = () => {
    return useQuery<User>('user', getUser, {
        staleTime: 1000 * 86400 * 3, // 3 days
        retry: false
    });
};

export { useUser };
