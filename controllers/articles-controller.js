const { specificArticle, allArticles, patchThisArticle, articlesQuery, articleToPost, deleteThisArticle } = require("../models/articles-model")

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
};
exports.postArticle = (req, res, next) => {
    articleToPost(req)
    .then((data) => {
        res.status(201).send(data)
    })
    .catch((err) => {
        next(err)
    })
};
exports.deleteArticle = (req, res, next) => {
    deleteThisArticle(req)
    .then((data) => {
        res.status(204).send(data)
    })
    .catch((err) => {
        next(err)
    })
};