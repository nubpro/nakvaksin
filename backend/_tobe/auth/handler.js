'use strict';

module.exports.verifyUser = async (event) => {
    // TODO:
    // 1. hit MySejahtera api with x-auth-token (https://mysejahtera.malaysia.gov.my/epms/v1/mobileApp/vaccination/processFlow)
    // 2. if it returns, means the token is valid, hence user is verified

    // return: 200 or 401

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Go Serverless v2.0! Your function executed successfully!',
                input: event
            },
            null,
            2
        )
    };
};
