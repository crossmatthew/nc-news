const { specificArticle } = require("../models/articles-model")

exports.getArticle = (req, res, next) => {
    specificArticle(req)
    .then((data) => {
        res.status(200).send({article: data[0]})
    })
    .catch((err) => {
        next(err)
    })
}