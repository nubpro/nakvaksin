import { axInstance } from '../apis/nakvaksin.instance';
import { VaxSubscription } from '../types/vaxSubscription';

function updateVaxSubscription(data: VaxSubscription) {
    return axInstance({
        method: 'POST',
        url: '/subscribe',
        data
    });
}

export { updateVaxSubscription };
