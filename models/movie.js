const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
    },
    nameRU: {
      type: String,
      required: true,
      minlength: 2,
    },
    nameEN: {
      type: String,
      required: true,
      minlength: 2,
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Неправильный формат ссылки',
      },
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Неправильный формат ссылки',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isUrl(v),
        message: 'Неправильный формат ссылки',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
