const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports.index = (req, res) => {
	res.json({ message: 'Welcome to awesome API' })
}

module.exports.getUsers = async (req, res) => {
	const users = await User.find()
	res.json(users)
}

module.exports.authenticate = async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({ username })

		if (!user) {
			res.json({ 
				success: false, 
				message: 'athentication failed! user not found.'
			})
			return
		}

		if (user.password !== password) {
			res.json({ 
				success: false, 
				message: 'athentication failed! wrong password.'
			})
			return
		}

		const payload = { admin: user.isAdmin }
		const secretKey = process.env.SECRET
		const token = jwt.sign(
			payload, 
			secretKey, 
			{ expiresIn: '1h' }
		)

		res.json({
			success: true,
			message: 'token is created!',
			token
		})
	} catch(err) {
		throw err
	}
}