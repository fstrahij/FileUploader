require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const initRoutes = require("./upload")

global.__basedir = __dirname


app.use(express.static("public"))
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

const corsConfig = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Credentials', true)
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	next()
}
app.use(corsConfig);

app.get('/', (request, response) => {
	response.json({ info: 'File Uploader with Node.js and Express'})
})

initRoutes(app);

app.listen(process.env.PORT || port, () => {
	console.log(`App running on port ${port}.`)
})