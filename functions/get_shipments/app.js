/* eslint-disable operator-linebreak */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
const { getShipments } = require('./service');

module.exports.handler = async () => {
  try {
    const { Items } = await getShipments();

    return { statusCode: 200, body: JSON.stringify(Items) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
