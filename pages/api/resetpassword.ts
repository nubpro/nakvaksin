import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import formatPhoneNumber from '../../utlis/formatPhoneNumber';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (
        !req.body.username.includes('@') &&
        !req.body.username.includes('+') &&
        !req.body.username.includes('-') &&
        !req.body.username.match('^[0-9]+$')
    ) {
        return res.status(400).json({
            message: 'Invalid Input'
        });
    }
    try {
        await axios({
            method: 'post',
            url: 'https://mysejahtera.malaysia.gov.my/register/forgotPassword',
            data: {
                emailOrUserName: formatPhoneNumber(req.body.username)
            },
            timeout: 5000,
            timeoutErrorMessage: 'TIMEOUT'
        });

        res.status(200).json({
            status: 'OK'
        });
    } catch (err) {
        return res.status(err.response.status).json({ error: err.message });
    }
};
