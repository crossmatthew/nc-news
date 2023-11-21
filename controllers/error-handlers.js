exports.handleFourZeroFour = (req, res, next) => {
    res.status(404).send('Not Found!')
}
exports.handlePsqlErrors = (err, req, res, next) => {
	if (err.code.startsWith('22')) {
		res.status(400).send({ message: 'Bad Request' });
	}
	next(err)
};
