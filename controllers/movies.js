const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createMovie = (req, res, next) => {
  const owner = req.user.id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Название или ссылка введены неверно!'));
        return;
      }
      next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет карточки с таким  ID');
      }
      if (req.user.id.toString() === movie.owner.toString()) {
        Movie.findByIdAndRemove(req.params.id)
          .then(() => {
            res.status(200).send({ message: 'Фильм удален!' });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError('Некорректный ID'));
              return;
            }
            next(err);
          });
        return;
      }
      throw new ForbiddenError('Вы не являетесь создателем этого фильма!');
    })
    .catch((err) => next(err));
};
