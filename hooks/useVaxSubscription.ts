import { useQuery } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import { VaxSubscription } from '../types/vaxSubscription';

const QK_SUBSCRIBE = 'subscribe';

async function getVaxSubscription() {
    const { data } = await axInstance({
        method: 'GET',
        url: '/subscribe'
    });

    return data;
}

const useVaxSubscription = () => {
    return useQuery<VaxSubscription>(QK_SUBSCRIBE, getVaxSubscription);
};

export { useVaxSubscription };
