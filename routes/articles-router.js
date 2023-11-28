const { getAllArticles, patchArticle, getArticle, postArticle } = require('../controllers/articles-controller');
const { getComments, postComment } = require('../controllers/comments-controller');

const articlesRouter = require('express').Router();

articlesRouter
.route('/')
.get(getAllArticles)
.post(postArticle);

articlesRouter.get('/:article_id', getArticle);

articlesRouter
.route('/:article_id/comments')
.get(getComments)
.post(postComment)

articlesRouter
.route('/:article_id')
.patch(patchArticle);

module.exports = articlesRouter;