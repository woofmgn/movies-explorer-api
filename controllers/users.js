const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/notFoundError');
const IncorrectDataError = require('../errors/incorrectDataError');

const User = require('../models/user');
const EmailNotUniqueError = require('../errors/emailNotUniqeError');

const {
  EMAIL_ALREADY_EXISTS,
  REGISTER_INCORRECT_DATA,
  USER_NOT_FOUND,
  INCORRECT_DATA_EDIT_PROFILE,
} = require('../utils/utils');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.send({
          name: user.name, email: user.email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new EmailNotUniqueError(EMAIL_ALREADY_EXISTS));
          } else if (err.name === 'ValidationError') {
            next(new IncorrectDataError(REGISTER_INCORRECT_DATA));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(err));
};

module.exports.editUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError(USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        next(new NotFoundError(USER_NOT_FOUND));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectDataError(INCORRECT_DATA_EDIT_PROFILE));
      } else {
        next(err);
      }
    });
};
