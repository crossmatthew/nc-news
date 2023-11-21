const express = require('express');
const app = express();
const { getEndpointsJson, getTopics, getArticle } = require('./controllers/topics-controller');

app.use(express.json());

app.get('/api', getEndpointsJson);
app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticle);

app.use((req, res, next) => {
    res.status(404).send("Not Found!")
  })

module.exports = app;