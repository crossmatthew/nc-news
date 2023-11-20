const express = require('express');
const app = express();
app.use(express.json());
const { getTopics } = require('./controllers/topics-controller');
const { handleCustomErrors } = require('./controllers/errorhandlers')


app.get('/api/topics', getTopics);

app.use(handleCustomErrors);
app.use((req, res, next) => {
    res.status(404).send("Not Found!")
  })

module.exports = app;