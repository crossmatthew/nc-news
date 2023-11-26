const { getAllArticles, patchArticle, getArticle } = require('../controllers/articles-controller');
const { getComments, postComment } = require('../controllers/comments-controller');

const articlesRouter = require('express').Router();

articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:article_id', getArticle);

articlesRouter
.route('/:article_id/comments')
.get(getComments)
.post(postComment)

articlesRouter
.route('/:article_id')
.patch(patchArticle);

module.exports = articlesRouter;