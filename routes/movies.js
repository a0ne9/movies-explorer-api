const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.delete(
  '/movies/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie,
);

router.get('/movies', getMovies);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().required().min(2).max(30),
      image: Joi.string()
        .required()
        .pattern(
          /(http|www|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:~+#-]*[\w@?^=%&~+#-])/,
        ),
      country: Joi.string().required().min(2).max(30),
      director: Joi.string().required().min(2).max(30),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      trailerLink: Joi.string()
        .required()
        .pattern(
          /(http|www|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:~+#-]*[\w@?^=%&~+#-])/,
        ),
      nameEN: Joi.string().required().min(2).max(30),
      thumbnail: Joi.string()
        .required()
        .pattern(
          /(http|www|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:~+#-]*[\w@?^=%&~+#-])/,
        ),
      movieId: Joi.string().hex().length(24),
      owner: Joi.string().hex().length(24),
    }),
  }),
  createMovie,
);

module.exports.CardsRouter = router;
