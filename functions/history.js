var thingspeakHandler = require('../handlers/thingspeakDataHandler');
exports.handler = async function (event, context) {
  //const input = JSON.parse(event.body);
  var data = await thingspeakHandler.getThingspeakProcessedData();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};