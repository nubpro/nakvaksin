import AWS from 'aws-sdk';

export const pushUserToQueue = async (event) => {
    const params = {
        DelaySeconds: 10,
        MessageBody:
            'Information about current NY Times fiction bestseller for week of 12/11/2016.',
        QueueUrl: process.env.PreUserQueue_URL
    };
    const sqsClient = new AWS.SQS();

    const data = await sqsClient.sendMessage(params).promise();
    console.log('Success, message sent. MessageID:', data.MessageId, process.env.PreUserQueue_URL);
    return data; // For unit tests.
};
