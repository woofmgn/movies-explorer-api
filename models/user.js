const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const IncorrectDataError = require('../errors/incorrectDataError');
const IncorrectTokenError = require('../errors/incorrectTokenError');
const {
  USER_IS_NOT_REGISTERED,
  INCORRECT_EMAIL_OR_PASS,
  INCORRECT_EMAIL,
} = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'длина имени должна быть не менее 2 символов'],
    maxlength: [30, 'длина имени должна быть не более 30 символов'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: INCORRECT_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function checking(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new IncorrectTokenError(USER_IS_NOT_REGISTERED));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new IncorrectDataError(INCORRECT_EMAIL_OR_PASS));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
