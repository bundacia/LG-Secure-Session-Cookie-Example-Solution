import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import onHeaders from 'on-headers'

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(function (req, res, next) {
  req.session = req.cookies.sessionCookie
  res.session = req.session
  onHeaders(res, function() {
    res.cookie('sessionCookie', res.session)
  })
  next()
})

app.get('/', function (req, res) {
  res.render('index', req.session)
})

app.post('/', function (req, res) {
  res.session = req.body
  res.render('index', res.session)
})

app.listen(3000, function () {
  console.log("🌏 Server Listening on localhost:3000")
})
