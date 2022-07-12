const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { UserRouter } = require('./users');
const { AuthorisationRouter } = require('./authorization');
const { isAuthorised } = require('../middlewares/isAuthorised');
const { MoviesRouter } = require('./movies');

router.use('/', AuthorisationRouter);
router.use(isAuthorised);
router.use('/users', UserRouter);
router.use('/movies', MoviesRouter);
router.all('*', (res, req, next) => {
  next(new NotFoundError('Cтраницы не существует'));
});

module.exports.appRouter = router;
