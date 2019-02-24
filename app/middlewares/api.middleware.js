const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token']

	if (!token) {
		res.status(403).send({
			success: false,
			message: 'no token provied'
		})
		return
	}

	const secretKey = process.env.SECRET
	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			res.json({
				success: false,
				message: 'failed to authenticate token'
			})
			return
		}

		req.decoded = decoded
	})

	next()
}