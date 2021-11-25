var sensors_controller = require('../../handlers/listOfSensorsIDs');

/* GET home page. */
exports.handler = async function (event, context) {
  const data = await sensors_controller.listSensors();
  return {
    statusCode: 200,
    body: JSON.stringify({ data: data })
  };
};
