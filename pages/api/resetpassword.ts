import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import sanitizePhoneNumber from '../../utils/sanitizePhoneNumber';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://mysejahtera.malaysia.gov.my/register/forgotPassword',
            data: {
                emailOrUserName: sanitizePhoneNumber(req.body.username)
            },
            timeout: 5000
        });

        // When MySejahtera returns false in body, means user does not exists
        if (response.data === false) {
            return res.status(400).json({
                message: 'USER_NOT_FOUND'
            });
        }

        return res.status(200).json({
            message: 'OK'
        });
    } catch (err) {
        // Axios timeout
        if (err?.code === 'ECONNABORTED') {
            return res.status(408).end(); // most likely because the user does not exists or our server kena ratelimit
        }

        return res.status(err.response.status).json({ error: err.message });
    }
};
