const { createClient, getClientById, publishEvent } = require('./service');

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { Item: existClient } = await getClientById(body.client_id);

    await publishEvent({
      event: body,
      action: existClient ? 'Shipment' : 'Client Created',
      source: existClient ? 'shipment_rule' : 'client_rule',
    });

    if (!existClient) await createClient(body);

    return {
      statusCode: 200,
      body: !existClient ? JSON.stringify(body) : 'Gift sent',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
