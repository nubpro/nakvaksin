import { useQuery } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import VacSubscription from '../types/vacSubscription';

const QK_VAC_SUBSCRIPTION = 'vac_subscription';

async function getVacSub() {
    const { data } = await axInstance({
        method: 'GET',
        url: '/subscribe'
    });

    return data;
}

const useVacSub = () => {
    return useQuery<VacSubscription>(QK_VAC_SUBSCRIPTION, getVacSub, {
        staleTime: 60 * 5 * 1000
    });
};

export { QK_VAC_SUBSCRIPTION, useVacSub };
