const express = require('express')
const envelopesRouter = express.Router()
const db = require('../queries')
const utils = require('../utilities')

envelopesRouter.param('id', db.doesIdExist)

envelopesRouter.get('/', db.getEnvelopes)
envelopesRouter.post('/', db.doesEnvelopeExist, utils.validateBody, db.createEnvelope)

envelopesRouter.get('/:id', db.getEnvelopeById)
envelopesRouter.delete('/:id', db.deleteEnvelopeById)
envelopesRouter.put('/:id', utils.validateBody, db.updateEnvelopeById)

envelopesRouter.use('/', utils.handleInvalidMethods)
envelopesRouter.use('/:id', utils.handleInvalidMethods)

module.exports = envelopesRouter