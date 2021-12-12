const { getClientById } = require('./service');

module.exports.handler = async (event) => {
  try {
    console.log(event);
    const item = await getClientById('1');

    return {
      statusCode: 200,
      body: JSON.stringify({ ...item.Item }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
