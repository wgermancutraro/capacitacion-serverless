const { getClientById } = require('./service');

module.exports.handler = async (event) => {
  try {
    const { Item } = await getClientById(event.pathParameters.id);

    if (!Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Client not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ...Item }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
