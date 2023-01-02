require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { errors } = require('celebrate');
const router = require('./routes');

const handlerError = require('./middlewares/handlerError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsMiddleware = require('./middlewares/corsMiddleware');
const rateLimiter = require('./middlewares/rateLimiter');
const NotFoundError = require('./errors/notFoundError');
const { PAGE_NOT_FOUND } = require('./utils/utils');
const { PORT_CONFIG, DB_CONFIG } = require('./utils/config');

const app = express();

mongoose.connect(DB_CONFIG, { family: 4 });

app.use(bodyParser.json());

app.use(requestLogger);

app.use(rateLimiter);
app.use(helmet());
app.use(corsMiddleware);

app.use(router);
app.use('*', () => {
  throw new NotFoundError(PAGE_NOT_FOUND);
});

app.use(errorLogger);
app.use(errors());
app.use(handlerError);

app.listen(PORT_CONFIG, () => {
  console.log(`listen a ${PORT_CONFIG}`);
});
