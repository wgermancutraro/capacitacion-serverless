/* eslint-disable operator-linebreak */
/* eslint-disable indent */
const { setClientGift } = require('./service');

module.exports.handler = async (event) => {
  try {
    const record = event.Records[0];
    const isFromStream = record.dynamodb?.NewImage;

    let client;

    if (isFromStream) {
      client = {
        client_id: record.dynamodb.NewImage.client_id.S,
        role: record.dynamodb.NewImage.role.S,
      };
    } else client = JSON.parse(record.body).detail;

    if ((isFromStream && record.eventName === 'MODIFY') || record?.body) {
      await setClientGift(client);
    }

    return { statusCode: 200 };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
