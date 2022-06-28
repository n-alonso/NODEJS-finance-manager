const express = require('express')
const envelopesRouter = express.Router()
const db = require('../queries')

envelopesRouter.get('/', db.getEnvelopes)
envelopesRouter.get('/:id', db.getEnvelopeById)

module.exports = envelopesRouter