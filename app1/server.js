import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', function (req, res) {
  const name = req.cookies.name
  res.render('index', {name})
})

app.post('/', function (req, res) {
  const name = req.body["name"]
  res.cookie('name', name)
  res.render('index', {name})
})

app.listen(3000, function () {
  console.log("🌏 Server Listening on localhost:3000")
})
