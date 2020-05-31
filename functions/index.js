const express = require('express')
const bodyParser = require('body-parser')
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const router = require('./src/router')

admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/v1', router)
app.get('*', (req, res) => res.status(404).json({success: false}))

exports.api = functions.https.onRequest(app)
