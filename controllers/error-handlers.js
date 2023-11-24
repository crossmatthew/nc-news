exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code) {
        res.status(400).send({ code: err.code, msg: 'Bad Request' });
    }
    next(err)
};
exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status >= 400 && err.status < 500) {
            res.status(err.status).send({ msg: err.msg })
    }
    next(err)
};
exports.handleFiveHundred = (err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error'})
};
exports.handleFourZeroFour = (req, res, next) => {
    res.status(404).send('Not Found!')
};
