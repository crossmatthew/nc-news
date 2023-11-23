const { commentsOfArticle } = require("../models/comments-model")

exports.getComments = (req, res, next) => {
    commentsOfArticle(req)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        console.log('!!!!', err)
        next(err)
    })
}