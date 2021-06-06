import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { username, password } = req.body;

        const loginRes = await axios({
            method: 'POST',
            url: 'https://mysejahtera.malaysia.gov.my/epms/login',
            data: {
                username,
                password
            }
        });

        if (loginRes.status !== 200) {
            return new Error('Unable to authenticate');
        }

        const token = loginRes.headers['x-auth-token'] ?? null;

        const userInfoResp = await axios({
            method: 'GET',
            url: 'https://mysejahtera.malaysia.gov.my/epms/v1/mobileApp/vaccinationEmployeeInfo',
            headers: {
                'x-auth-token': token
            }
        });

        const { displayName } = userInfoResp.data.employeeInfo;

        res.status(200).json({
            'x-auth-token': token,
            username,
            displayName
        });
    } catch (err) {
        return res.status(err.response.status).json({ error: err.message });
    }
};
