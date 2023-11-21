const { allTopics, allEndpoints } = require("../models/topics-model")

exports.getTopics = (req, res, next) => {
    allTopics(req)
    .then((data) => {
        res.status(200).send({topics: data})
    })
    .catch((err) => {
        next(err)
    })
}
exports.getEndpointsJson = (req, res, next) => {
    allEndpoints(req)
    .then((data) => {
        res.status(200).send({endpoints: data})
    })
    .catch((err) => {
        next(err)
    })
}