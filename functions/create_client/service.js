const dynamodb = require('aws-sdk/clients/dynamodb');
const { EventBridge } = require('aws-sdk');

const db = new dynamodb.DocumentClient({ region: 'us-east-1' });

const eventbridge = new EventBridge();
const TABLE_NAME = process.env.CLIENTS_TABLE;

exports.createClient = async (client) => {
  const params = {
    TableName: TABLE_NAME,
    Item: client,
  };

  return db.put(params).promise();
};

exports.getClientById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      client_id: id,
    },
  };

  return db.get(params).promise();
};

exports.publishEvent = async ({ event, action, source }) => {
  const params = {
    Entries: [
      {
        Detail: JSON.stringify(event),
        DetailType: action,
        Source: source,
      },
    ],
  };

  return eventbridge.putEvents(params).promise();
};
