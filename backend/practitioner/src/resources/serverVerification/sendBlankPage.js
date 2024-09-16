const logger = require('log4js').getLogger('send blank page resource');
const httpStatus = require('http-status');

function sendBlankPage(req, res) {
  logger.info(`send blank page resource in the version ${req.version}`);
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
  </head>
  <body>
    <h1>Medical System</h1>
  </body>
  </html>`;
  try {
    return res.status(httpStatus['OK']).send(html).end();
  } catch (err) {
    return res.status(httpStatus['INTERNAL_SERVER_ERROR']).send(err).end();
  }
}

module.exports = sendBlankPage;
