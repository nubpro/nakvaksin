import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import sanitizePhoneNumber from '../../utils/sanitizePhoneNumber';

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
        const response = await axios({
            method: 'post',
            url: 'https://mysejahtera.malaysia.gov.my/register/forgotPassword',
            data: {
                emailOrUserName: sanitizePhoneNumber(req.body.username)
            },
            timeout: 5000,
            timeoutErrorMessage: 'TIMEOUT'
        });

        /**
         * Weird behaving of MySej API status, it mean the user do not exits
         */
        if (!response.data) {
            return res.status(404).json({
                message: 'Email/Phone Number Not Found'
            });
        }

        return res.status(200).json({
            message: 'OK'
        });
    } catch (err) {
        // Axios Timeout Due to the Invalid Input
        if (err?.code === 'ECONNABORTED') {
            return res.status(408).json({
                message: 'Request Timed out'
            });
        }
        return res.status(err.response.status).json({ error: err.message });
    }
};
