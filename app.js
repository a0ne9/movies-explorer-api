require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { appRouter } = require('./routes/index');

const {
  PORT = 3001,
  MONGO_URL,
  NODE_ENV,
  DEFAULT_MONGO_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

const app = express();
app.use(express.json());
mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : DEFAULT_MONGO_URL);
app.use(requestLogger);
app.use(limiter);
app.use(cors());
app.use(helmet());

app.use(appRouter);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message || 'Ошибка на сервере' });
  }
  res.status(500).send({ message: 'Ошибка на сервере' });
  return next();
});

app.listen(PORT);
