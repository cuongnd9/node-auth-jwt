require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

const User = require('./app/models/user')
const apiRoute = require('./app/routes/api')
const apiMiddleware = require('./app/middlewares/api.middleware')

const app = express()

const port = process.env.PORT || 8080

mongoose.connect(
	process.env.MONGODB_URI, 
	{useNewUrlParser: true}
);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
	res.json({ message: 'Chao Xin!' })
})

app.get('/setup', async (req, res) => {
	var user = new User({
		username: 'cuongw',
		password: 'cuongw',
		isAdmin: true
	})

	try {
		await user.save()
		res.json({ 
			success: true, 
			message: 'user was created!' 
		})
	} catch(err) {
		throw err
	}
})

app.use('/api', apiMiddleware.verifyToken, apiRoute)

app.listen(port, () => 
	console.log(`Server is running on port ${port}.`)
)