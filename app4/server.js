import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import onHeaders from 'on-headers'

import Cryptr from 'cryptr'
import config from './config'
const cryptr = new Cryptr(config.encryptionKey)

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(function (req, res, next) {
  req.session = decryptSession(req.cookies.sessionCookie)
  onHeaders(res, function() {
    const secureSession = encryptSession(req.session)
    res.cookie('sessionCookie', secureSession)
  })
  next()
})

app.get('/', function (req, res) {
  res.render('index', req.session)
})

app.post('/', function (req, res) {
  req.session = req.body
  res.render('index', req.session)
})

app.listen(3000, function () {
  console.log("🌏 Server Listening on localhost:3000")
})

function encryptSession(session) {
  if (!session) {
    session = {}
  }
  return cryptr.encrypt(JSON.stringify(session))
}

function decryptSession(string) {
  if (typeof string === 'undefined') {
    return {}
  }
  console.log({string, decrypt: cryptr.decrypt(string)})
  return JSON.parse(cryptr.decrypt(string))
}
