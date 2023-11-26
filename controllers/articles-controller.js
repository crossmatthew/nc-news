const { specificArticle, allArticles, patchThisArticle, articlesQuery, articlesSortBy } = require("../models/articles-model")

exports.getArticle = (req, res, next) => {
    specificArticle(req)
    .then((data) => {
        res.status(200).send({article: data[0]})
    })
    .catch((err) => {
        next(err)
    })
};
exports.getAllArticles = (req, res, next) => {
    if (req.query.topic) return articlesQuery(req)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
    return allArticles(req)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
};
exports.patchArticle = (req, res, next) => {
    patchThisArticle(req)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
}