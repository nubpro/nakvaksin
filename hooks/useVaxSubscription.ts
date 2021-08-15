import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import { VaxSubscription } from '../types/vaxSubscription';
import { useUser } from './useUser';

const QK_VAC_SUBSCRIPTION = 'vax_subscription';

async function getVaxSubscription() {
    const { data } = await axInstance({
        method: 'GET',
        url: '/subscribe'
    });

    return data;
}

const useVaxSubscription = () => {
    const { logout } = useUser();

    return useQuery<VaxSubscription, AxiosError>(QK_VAC_SUBSCRIPTION, getVaxSubscription, {
        staleTime: 60 * 5 * 1000,
        retry: 0, // TODO: in the future, dont retry only for 404 error, 404 means the user has not subscribed
        onError: (error) => {
            if (error.response?.status === 400 || error.response?.status === 401) {
                logout(true);
            }
        }
    });
};

export { QK_VAC_SUBSCRIPTION, useVaxSubscription };
