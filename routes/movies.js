const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regex } = require('../utils/regex');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie,
);

router.get('/', getMovies);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().required().min(2).max(30),
      image: Joi.string()
        .required()
        .pattern(
          regex,
        ),
      country: Joi.string().required().min(2).max(30),
      director: Joi.string().required().min(2).max(30),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      trailerLink: Joi.string()
        .required()
        .pattern(
          regex,
        ),
      nameEN: Joi.string().required().min(2).max(30),
      thumbnail: Joi.string()
        .required()
        .pattern(
          regex,
        ),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

module.exports = router;
