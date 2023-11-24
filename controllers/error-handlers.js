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
    console.log(err)
    res.status(500).send({ msg: 'Internal Server Error'})
};
exports.handleFourZeroFour = (req, res, next) => {
    if (!res.msg) res.msg = 'Not Found!';
    res.status(404).send({ msg: res.msg })
};
