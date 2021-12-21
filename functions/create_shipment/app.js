/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
const uuid = require('uuid');
const {
  createShipment,
  getShipment,
  updateShipmentStatus,
} = require('./service');

module.exports.handler = async (event) => {
  try {
    const clientId =
      event.detail?.client_id ||
      event.Records[0]?.dynamodb?.NewImage?.client_id.S;
    const isFromStream = !!event?.Records;

    const { Items: existShipment } = await getShipment(clientId);

    if (
      existShipment.length &&
      existShipment.some(
        (s) => s.status === 'PENDING' && s.client_id === clientId
      ) &&
      !isFromStream
    ) {
      await Promise.all(
        existShipment.map(async (_, i) => {
          await updateShipmentStatus(clientId, existShipment[i].shipment_id);
        })
      );
    } else
      await createShipment({
        client_id: clientId,
        shipment_id: uuid.v4(),
        status: 'PENDING',
      });

    return { statusCode: 200 };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
