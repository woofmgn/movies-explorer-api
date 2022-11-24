require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { login, createUser } = require('./controllers/users');

const handlerError = require('./middlewares/handlerError');
const { validationCreateUser, validationLoginUser } = require('./middlewares/validationJoiUser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsMiddleware = require('./middlewares/corsMiddleware');

const NotFoundError = require('./errors/notFoundError');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use(corsMiddleware);

app.post('/signin', validationLoginUser, login);
app.post('/signup', validationCreateUser, createUser);
app.use(userRouter);
app.use(movieRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
  console.log(`listen a ${PORT}`);
});
