const REGEX_URL = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
const INCORRECT_DATA_CREATE_MOVIE = 'Переданы некорректные данные для добавления фильм, произошла ошибка валидации';
const MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден';
const FORBIDDEN_DELETE_MOVIE = 'Нельзя удалить чужой фильм';
const INCORRECT_DATA_DELETE_MOVIE = 'Переданы некорректные данные для удаления фильма, произошла ошибка';
const EMAIL_ALREADY_EXISTS = 'Такой пользователь уже существует, введите другой email';
const USER_IS_NOT_REGISTERED = 'Данный пользователь не зарегистрирован';
const INCORRECT_EMAIL_OR_PASS = 'Неправильные почта или пароль';
const REGISTER_INCORRECT_DATA = 'Переданы некорректные данные при создании пользователя, произошла ошибка валидации';
const USER_NOT_FOUND = 'Пользователь с указанным _id не найден, произошла ошибка';
const INCORRECT_DATA_EDIT_PROFILE = 'Переданы некорректные данные при обновлении профиля, произошла ошибка валидации';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const DEFAULT_ERROR = 'Произошла ошибка';
const INCORRECT_URL = 'Некорректный URL';
const INCORRECT_EMAIL = 'Некоррекный email';

module.exports = {
  REGEX_URL,
  INCORRECT_DATA_CREATE_MOVIE,
  MOVIE_NOT_FOUND,
  FORBIDDEN_DELETE_MOVIE,
  INCORRECT_DATA_DELETE_MOVIE,
  EMAIL_ALREADY_EXISTS,
  USER_IS_NOT_REGISTERED,
  INCORRECT_EMAIL_OR_PASS,
  REGISTER_INCORRECT_DATA,
  USER_NOT_FOUND,
  INCORRECT_DATA_EDIT_PROFILE,
  AUTHORIZATION_REQUIRED,
  DEFAULT_ERROR,
  INCORRECT_URL,
  INCORRECT_EMAIL,
};
