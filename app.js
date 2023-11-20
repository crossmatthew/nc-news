const express = require('express');
const app = express();
app.use(express.json());
const { getTopics } = require('./controllers/topics-controller');


app.get('/api/topics', getTopics);