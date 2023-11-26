const apiRouter = require('express').Router();
const { getEndpointsJson } = require('../controllers/endpoints-controller');
const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router');
const topicsRouter = require('./topics-router');
const usersRouter = require('./users-router');

apiRouter.get('/', getEndpointsJson);

apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;