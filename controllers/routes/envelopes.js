const express = require('express')
const envelopesRouter = express.Router()
const db = require('../queries')

envelopesRouter.param('id', db.doesIdExist)

envelopesRouter.get('/', db.getEnvelopes)

envelopesRouter.get('/:id', db.getEnvelopeById)
envelopesRouter.delete('/:id', db.deleteEnvelopeById)

module.exports = envelopesRouter