const express = require('express');
const app = express();
app.use(express.json());
const { getTopics, getEndpointsJson } = require('./controllers/topics-controller');


app.get('/api/topics', getTopics);
app.get('/api', getEndpointsJson);

app.use((req, res, next) => {
    res.status(404).send("Not Found!")
  })

module.exports = app;