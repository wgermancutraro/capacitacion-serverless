const dynamodb = require('aws-sdk/clients/dynamodb');
const { setGift } = require('./helpers');

const db = new dynamodb.DocumentClient({ region: 'us-east-1' });
const TABLE_NAME = process.env.CLIENTS_TABLE;

exports.setClientGift = async (client) => {
  console.log(client);
  const params = {
    TableName: TABLE_NAME,
    Key: {
      client_id: client.client_id,
    },
    UpdateExpression: 'set gift = :gift',
    ExpressionAttributeValues: {
      ':gift': setGift(client.role),
    },
    ReturnValues: 'UPDATED_NEW',
  };

  return db.update(params).promise();
};
