const express = require('express');
const app = express();
app.use(express.json());
const { getTopics } = require('./controllers/topics-controller');


app.get('/api/topics', getTopics);

app.use((req, res, next) => {
    res.status(404).send("Not Found!")
  })

module.exports = app;