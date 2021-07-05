import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await axios({
            method: 'post',
            url: 'https://mysejahtera.malaysia.gov.my/register/forgotPassword',
            headers: {
                Connection: 'keep-alive',
                'Accept-Language': 'en-MY;q=1, zh-Hans-MY;q=0.9',
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': '33',
                'User-Agent': 'MySejahtera/1.0.36 (iPhone; iOS 14.4.2; Scale/2.00)',
                Host: 'mysejahtera.malaysia.gov.my'
            },
            data: {
                emailOrUserName: req.body.emailOrUserName
            }
        });

        res.status(200).json({
            status: 'OK'
        });
    } catch (err) {
        return res.status(err.response.status).json({ error: err.message });
    }
};
