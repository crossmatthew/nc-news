const express = require('express');
const { getEndpointsJson } = require('./controllers/endpoints-controller');
const { getArticle } = require('./controllers/articles-controller');
const { getTopics } = require('./controllers/topics-controller');
const { handleFourZeroFour } = require('./controllers/error-handlers');
const app = express();


app.use(express.json());

app.get('/api', getEndpointsJson);
app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);

app.all('*', handleFourZeroFour);
  
module.exports = app;