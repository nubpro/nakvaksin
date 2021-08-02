import { useQuery } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import { VaxSubscription } from '../types/vaxSubscription';

const QK_VAC_SUBSCRIPTION = 'vax_subscription';

async function getVaxSubscription() {
    const { data } = await axInstance({
        method: 'GET',
        url: '/subscribe'
    });

    return data;
}

const useVaxSubscription = () => {
    return useQuery<VaxSubscription>(QK_VAC_SUBSCRIPTION, getVaxSubscription, {
        staleTime: 60 * 5 * 1000
    });
};

export { QK_VAC_SUBSCRIPTION, useVaxSubscription };
