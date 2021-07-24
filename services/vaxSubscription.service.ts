import { axInstance } from '../apis/nakvaksin.instance';
import VacSubscription from '../types/VacSubscription';

function updateVacSub(data: VacSubscription) {
    return axInstance({
        method: 'POST',
        url: '/subscribe',
        data
    });
}

export { updateVacSub };
