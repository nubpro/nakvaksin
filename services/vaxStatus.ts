import { axInstance } from '../apis/nakvaksin.instance';

async function getVaxStatus() {
    const { data } = await axInstance({
        method: 'GET',
        url: '/vac-status'
    });

    return data;
}

export { getVaxStatus };
