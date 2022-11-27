const IncorrectDataError = require('../errors/incorrectDataError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const Movie = require('../models/movie');

const {
  INCORRECT_DATA_CREATE_MOVIE,
  MOVIE_NOT_FOUND,
  FORBIDDEN_DELETE_MOVIE,
  INCORRECT_DATA_DELETE_MOVIE,
} = require('../utils/utils');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError(INCORRECT_DATA_CREATE_MOVIE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_DELETE_MOVIE);
      }
      Movie.findByIdAndRemove(req.params._id)
        .then(() => res.send({ message: `Фильм ${req.params._id} удален` }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError(INCORRECT_DATA_DELETE_MOVIE));
      } else {
        next(err);
      }
    });
};
