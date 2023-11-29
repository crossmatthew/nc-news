const { getAllArticles, patchArticle, getArticle, postArticle, deleteArticle } = require('../controllers/articles-controller');
const { getComments, postComment } = require('../controllers/comments-controller');

const articlesRouter = require('express').Router();

articlesRouter
.route('/')
.get(getAllArticles)
.post(postArticle);

articlesRouter
.route('/:article_id')
.get(getArticle)
.delete(deleteArticle);

articlesRouter
.route('/:article_id/comments')
.get(getComments)
.post(postComment);

articlesRouter
.route('/:article_id')
.patch(patchArticle);

module.exports = articlesRouter;