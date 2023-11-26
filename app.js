const express = require('express');
const { handleFourZeroFour, handlePsqlErrors, handleCustomErrors, handleFiveHundred } = require('./controllers/error-handlers');
const apiRouter = require('./routes/api-router');
const app = express();

app.use(express.json());
app.use('/api', apiRouter)
app.all('*', handleFourZeroFour);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleFiveHundred);
  
module.exports = app;