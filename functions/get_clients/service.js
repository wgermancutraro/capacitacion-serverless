const dynamodb = require('aws-sdk/clients/dynamodb');

const db = new dynamodb.DocumentClient({ region: 'us-east-1' });
const TABLE_NAME = process.env.CLIENTS_TABLE;

exports.getClientById = async (clientId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      client_id: clientId,
    },
  };

  return db.get(params).promise();
};
