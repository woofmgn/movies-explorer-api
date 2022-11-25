require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { errors } = require('celebrate');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');

const handlerError = require('./middlewares/handlerError');
const { validationCreateUser, validationLoginUser } = require('./middlewares/validationJoiUser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsMiddleware = require('./middlewares/corsMiddleware');
const rateLimiter = require('./middlewares/rateLimiter');
const NotFoundError = require('./errors/notFoundError');

const { PORT, MONGO_DB } = process.env;

const app = express();

mongoose.connect(MONGO_DB);

app.use(bodyParser.json());

app.use(requestLogger);

app.use(rateLimiter);
app.use(helmet());

app.use(corsMiddleware);

app.post('/signin', validationLoginUser, login);
app.post('/signup', validationCreateUser, createUser);
app.use(router);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
  console.log(`listen a ${PORT}`);
});
