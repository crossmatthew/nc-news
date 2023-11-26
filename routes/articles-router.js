const { getAllArticles, patchArticle } = require('../controllers/articles-controller');
const { getComments, postComment } = require('../controllers/comments-controller');
const { specificArticle } = require('../models/articles-model');

const articlesRouter = require('express').Router();

articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:article_id', specificArticle);

articlesRouter
.route('/:article_id/comments')
.get(getComments)
.post(postComment)
.patch(patchArticle);

module.exports = articlesRouter;