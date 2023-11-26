const endpointsRouter = require('express').Router();
const { getEndpointsJson } = require('../controllers/endpoints-controller');


endpointsRouter.get('', getEndpointsJson)

module.exports = endpointsRouter;