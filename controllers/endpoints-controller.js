const { allEndpoints } = require('../models/endpoints-model')

exports.getEndpointsJson = (req, res, next) => {
    allEndpoints(req)
    .then((data) => {
        res.status(200).send({endpoints: data})
    })
    .catch((err) => {
        next(err)
    })
}