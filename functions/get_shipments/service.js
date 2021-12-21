const dynamodb = require('aws-sdk/clients/dynamodb');

const db = new dynamodb.DocumentClient({ region: 'us-east-1' });

const TABLE_NAME = process.env.SHIPMENT_TABLE;

exports.getShipments = async () => {
  const params = {
    TableName: TABLE_NAME,
  };

  return db.scan(params).promise();
};
