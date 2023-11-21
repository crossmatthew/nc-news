const { specificArticles } = require("../models/articles-model")

exports.getArticle = (req, res, next) => {
    specificArticles(req)
    .then((data) => {
        res.status(200).send({article: data})
    })
    .catch((err) => {
        next(err)
    })
}