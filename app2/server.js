import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', function (req, res) {
  const userInfo = req.cookies.userInfo
  res.render('index', userInfo)
})

app.post('/', function (req, res) {
  const userInfo = req.body
  res.cookie('userInfo', userInfo)
  res.render('index', userInfo)
})

app.listen(3000, function () {
  console.log("🌏 Server Listening on localhost:3000")
})
