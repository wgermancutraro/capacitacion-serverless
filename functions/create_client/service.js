const dynamodb = require('aws-sdk/clients/dynamodb');

const db = new dynamodb.DocumentClient({ region: 'us-east-1' });
const TABLE_NAME = process.env.CLIENTS_TABLE;

exports.createClient = async (client) => {
  const params = {
    TableName: TABLE_NAME,
    Item: client,
  };

  return db.put(params).promise();
};
