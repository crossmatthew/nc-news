const { allTopics, allEndpoints, specificArticles } = require("../models/topics-model")

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
exports.getArticle = (req, res, next) => {
    specificArticles(req)
    .then((data) => {
        res.status(200).send({article: data})
    })
    .catch((err) => {
        next(err)
    })
}