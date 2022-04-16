const db = require('./db')

const findEnvelopeByName = (req, res, next) => {
    // Store the name provided in the path
    const name = String(req.params.name).toLowerCase()
    // Fetch the object in the DB with the same name and store it in the request object
    const namedEnvelope = db.envelopes.find(envelope => {
        return envelope.name.toLowerCase() === name
    })
    req.envelope = namedEnvelope
    // Check the index of it and store it as well
    const index = db.envelopes.findIndex(envelope => {
        return envelope.name.toLowerCase() === name
    })
    req.index = index
    // If the name cannot be found, throw an error
    if (namedEnvelope === undefined || index === undefined) {
        const err = new Error(
            `Cannot find an envelope with a 'name' of '${name}'.`
        )
        err.status = 404
        err.public = true
        throw err
    }
    next()
}

const validateSchema = (req, res, next) => {
    // Set the appropriate schema based on the path of the request, store it in the request object
    const path = req.baseUrl
    switch(path) {
        case '/salary':
            req.schema = { salary: 'number' }
            break
        case '/envelopes':
            req.schema = {
                name: 'string',
                limit: 'number',
                available: 'number'
            }
            break
    }
    // Skip schema validation for PATCH requests
    if (!req.method === 'patch') {
        // Validate the body schema for all requests and throw appropriate error
        const reqProperties = Object.keys(req.body)
        Object.keys(req.schema).forEach(property => {
            if (!reqProperties.includes(property)) {
                const err = new Error(
                    `Request malformed. The field '${property}: ${req.schema[property]}' is required.`
                )
                err.status = 400
                err.public = true
                throw err
            }
        })
    }
    next()
}

const validateType = (req, res, next) => {
    // Check which properties have been provided and store them in the request object
    const bodySchema = Object.keys(req.body)
    req.bodySchema = bodySchema
    // It assumes that 'validateSchema' has been run before
    const dbSchema = req.schema
    // Validate the type for all properties provided
    bodySchema.forEach(property => {
        if (typeof req.body[property] !== dbSchema[property]) {
            const err = new Error(
                `Request malformed. The field '${property}' should have type: '${dbSchema[property]}'.`
            )
            err.status = 400
            err.public = true
            throw err
        }
    })
    next()
}

const validateEnvelopeAmount = (req, res, next) => {
    const method = req.method
    let envelope;
    // If the method is POST, need to find the right envelope
    if (method.toLowerCase() === 'post') {
        const index = db.envelopes.findIndex(envelope => {
            return envelope.name.toLowerCase() === req.body.name.toLowerCase()
        })
        envelope = db.envelopes[index]
    } else {
        // It has already been found by 'findEnvelopeByName'
        envelope = db.envelopes[req.index]
    }
    // If availble or limit is provided it needs to be used, else fetch it from the DB
    const available = req.body.available || envelope.available
    const limit = req.body.limit || envelope.limit
    // If the limit is lower than the available, throw the appropriate error
    if (available > limit) {
        const err = new Error(
            `Request malformed. The field 'available' cannot be higher than 'limit'.`
        )
        err.status = 400
        err.public = true
        throw err
    }
    next()
}

const validateLimitsVsSalary = (req, res, next) => {
    // Calculate the sum of all limits from all envelopes
    let totalLimits = db.envelopes.reduce((a, b) => {
        return a + b.limit
    }, 0) // Initiate the tally with a value of zero
    // If a limit is supplied in the request, calculate the sum based on the provided limit instead
    if (req.body.limit) {
        // It assumes that 'findEnvelopeByName' has already been run
        totalLimits -= db.envelopes[req.index].limit
        totalLimits += req.body.limit
    }
    // If the sum of the limits is bigger than the salary, throw an error
    if (db.salary < totalLimits) {
        const err = new Error(
            `Request malformed. The sum of all 'limits' for all 'envelopes' cannot be higher than 'salary'.`
        )
        err.status = 400
        err.public = true
        throw err
    }
    next()
}

module.exports = { 
    findEnvelopeByName, 
    validateSchema, 
    validateType, 
    validateEnvelopeAmount,
    validateLimitsVsSalary
}