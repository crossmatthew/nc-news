const express = require('express');
const { getEndpointsJson } = require('./controllers/endpoints-controller');
const { getArticle, getAllArticles } = require('./controllers/articles-controller');
const { getTopics } = require('./controllers/topics-controller');
const { handleFourZeroFour, handlePsqlErrors, handleCustomErrors, handleFiveHundred } = require('./controllers/error-handlers');
const { getComments } = require('./controllers/comments-controller');
const app = express();


app.use(express.json());

app.get('/api', getEndpointsJson);
app.get('/api/topics', getTopics);
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:article_id', getArticle);
app.get('/api/articles/:article_id/comments', getComments);

app.all('*', handleFourZeroFour);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleFiveHundred);
  
module.exports = app;