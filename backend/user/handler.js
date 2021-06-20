import axios from 'axios';

// module.exports.saveUserToQueue = async (event) => {
//     // TODO:
//     // 1. save x-auth-token
//     // 2. save user information - username, displayName, age etc
//     // 3. Insert into SQS
//     // const { username, displayName, age, phoneNumber,   } =
// };

// module.exports.updateUserQueue = async (event) => {
//     // TODO:
//     // const { token } = event;
//     // insert into SQS
// };

// module.exports.updateUserConsumer = async (event) => {
//     // TODO:
//     // const { token } = event;
//     // insert into SQS
// };

export const getUserInfo = async (event) => {
    const res = await axios({
        method: 'GET',
        url: 'https://mysejahtera.malaysia.gov.my/epms/v1/mobileApp/vaccinationEmployeeInfo',
        headers: {
            'x-auth-token': event.queryStringParameters.token
        }
    });

    const { userName: username, displayName, phoneNumber, licenceNumber } = res.data.employeeInfo;
    // TODO: extract age from licenceNumber

    return {
        statusCode: 200,
        body: JSON.stringify({
            username,
            displayName,
            phoneNumber
        }),
        headers: {
            'content-type': 'application/json'
        }
    };
};

export const pushUserToQueue = async (event) => {
    // test
};

export const processPreUserQueue = async (event) => {
    console.log(event);
};
