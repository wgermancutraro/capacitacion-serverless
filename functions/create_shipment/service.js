const dynamodb = require('aws-sdk/clients/dynamodb');

const db = new dynamodb.DocumentClient({ region: 'us-east-1' });

const TABLE_NAME = process.env.SHIPMENT_TABLE;

exports.createShipment = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };

  return db.put(params).promise();
};

exports.getShipment = async (clientId) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: '#id = :clientId',
    ExpressionAttributeNames: {
      '#id': 'client_id',
    },
    ExpressionAttributeValues: {
      ':clientId': clientId,
    },
  };

  return db.query(params).promise();
};

exports.updateShipmentStatus = async (clientId, shipmentId) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      client_id: clientId,
      shipment_id: shipmentId,
    },
    UpdateExpression: 'set #s = :st',
    ExpressionAttributeNames: {
      '#s': 'status',
    },
    ExpressionAttributeValues: {
      ':st': 'CONFIRMED',
    },
    ReturnValues: 'UPDATED_NEW',
  };

  return db.update(params).promise();
};
