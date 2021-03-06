import axios from 'axios';

async function unSub(key: string) {
    return axios({
        url: 'https://nakvaksin-backend-6cmnfscq7a-as.a.run.app/nakvaksin/api/v1/unsub/' + key,
        method: 'GET'
    });
}

async function reSub(key: string) {
    return axios({
        url: 'https://nakvaksin-backend-6cmnfscq7a-as.a.run.app/nakvaksin/api/v1/resub/' + key,
        method: 'GET'
    });
}

export { reSub, unSub };
