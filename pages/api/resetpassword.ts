import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await axios({
            method: 'post',
            url: 'https://mysejahtera.malaysia.gov.my/register/forgotPassword',
            data: {
                emailOrUserName: req.body.username
            }
        });

        res.status(200).json({
            status: 'OK'
        });
    } catch (err) {
        return res.status(err.response.status).json({ error: err.message });
    }
};
