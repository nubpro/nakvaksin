import axios from 'axios';

async function unSub(key: string | string[]) {
    return axios({
        url: 'https://nakvaksin-backend-6cmnfscq7a-as.a.run.app/nakvaksin/api/v1/unsub/' + key,
        method: 'POST'
    });
}

async function reSub(key: string | string[] | undefined) {
    return axios({
        url: 'https://nakvaksin-backend-6cmnfscq7a-as.a.run.app/nakvaksin/api/v1/resub/' + key,
        method: 'POST'
    });
}

export { reSub, unSub };
