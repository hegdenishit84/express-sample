const express = require('express');
// parser to parse request data
const bodyParser = require('body-parser');
// router specific to product url's
const productRouter = require('./routes/products');
// i18n required for internationalization of messages
const i18n = require('./util/i18n');

const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const addRequestId = require('express-request-id')();


const app = express();
// required for REST API handling data in JSON format
app.use(bodyParser.json());
// initialize the i18n
app.use(i18n.init);

// create a unique request id for all requests
// log all requests to access.log along with the unique request id
app.use(addRequestId);
morgan.token('id', function getId(req) {
  return req.id;
});
const loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';
app.use(morgan(loggerFormat, {
  // eslint-disable-next-line max-len
  stream: fs.createWriteStream(path.join(__dirname, '../log/access.log'), {flags: 'a'}),
}));

app.use('/ec', productRouter);

// handling errors in middle ware in case any exception is thrown
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  res.status(status).json({message: message});
});

app.listen(8080);

module.exports = app;
