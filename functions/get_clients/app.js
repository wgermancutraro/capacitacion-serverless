const { getClients } = require('./service');

module.exports.handler = async () => {
  try {
    const { Items } = await getClients();

    return {
      statusCode: 200,
      body: JSON.stringify(Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
