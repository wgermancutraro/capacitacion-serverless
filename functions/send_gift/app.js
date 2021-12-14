const { setClientGift } = require('./service');

module.exports.handler = async (event) => {
  try {
    const client = event.Records[0].body;

    await setClientGift(JSON.parse(client));

    return { statusCode: 200 };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
