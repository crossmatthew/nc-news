const express = require('express');
const { getEndpointsJson } = require('./controllers/endpoints-controller');
const { getArticle } = require('./controllers/articles-controller');
const { getTopics } = require('./controllers/topics-controller');
const app = express();


app.use(express.json());

app.get('/api', getEndpointsJson);
app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);

app.use((req, res, next) => {
    res.status(404).send("Not Found!")
  })

module.exports = app;