const express = require('express')
const envelopesRouter = express.Router()
const { envelopes } = require('../../model/db')
const { findEnvelopeByName,
    validateSchema,
    validateType,
    validateEnvelopeAmount,
    validateLimitsVsSalary } = require('../utilities')

envelopesRouter.param('name', findEnvelopeByName)

envelopesRouter.get('/', (req, res, next) => {
    res.send(envelopes)
})
envelopesRouter.get('/:name', (req, res, next) => {
    res.send(envelopes[req.index])
})

envelopesRouter.post('/', validateSchema, validateType, validateEnvelopeAmount, validateLimitsVsSalary, (req, res, next) => {
    const newEnvelope = req.body
    envelopes.push(newEnvelope)
    res.status(201).send(newEnvelope)
})

envelopesRouter.put('/:name', validateSchema, validateType, validateEnvelopeAmount, validateLimitsVsSalary, (req, res, next) => {
    const updatedEnvelope = req.body
    Object.assign(envelopes[req.index], updatedEnvelope)
    res.send(envelopes[req.index])
})

envelopesRouter.patch('/:name', validateSchema, validateType, validateEnvelopeAmount, validateLimitsVsSalary, (req, res, next) => {
    // Check which properties are provided
    const bodySchema = req.bodySchema
    // For each property provided, update the value in the DB
    bodySchema.forEach((property, index) => {
        envelopes[req.index][bodySchema[index]] = req.body[property]
    })
    res.send(envelopes[req.index])
})

envelopesRouter.delete('/:name', (req, res, next) => {
    envelopes.splice(req.index, 1)
    res.sendStatus(204)
})

module.exports = envelopesRouter