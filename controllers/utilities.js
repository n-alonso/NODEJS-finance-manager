const db = require('./queries')

const schema = {
    salary: {
        amount: 'number'
    },
    envelopes: {
        name: 'string',
        spending_limit: 'number',
        spending_available: 'number'
    },
    expenses: {}
}

// Utility functions
const validateStructure = (req, endpoint, requestSchema) => {
    const array = Object.keys(requestSchema)
    for (const key of array) {
        if (!req.body[key]) {
            let err = new Error(
                `Bad request. Expected '${endpoint}.${key}: ${requestSchema[key]}' in the body of the request.`
            )
            err.code = 400
            err.public = true
            throw err
            break
        } else if (typeof req.body[key] !== requestSchema[key]) {
            let err = new Error(
                `Bad request. '${endpoint}.${key}' needs to be of the 'type: ${requestSchema[key]}'.`
            )
            err.code = 400
            err.public = true
            throw err
            break
        }
    }
}

const validateEnvelope = req => {
    if (req.body.spending_available > req.body.spending_limit) {
        let err = new Error(
            "Bad request. 'spending_limit' cannot be lower than 'spending_available'."
        )
        err.code = 400
        err.public = true
        throw err
    }
}

const validateSalary = req => {
    if (req.body.amount < 0) {
        let err = new Error(
            "Bad request. 'Salary.amount' cannot be lower than '0'."
        )
        err.code = 400
        err.public = true
        return err
    } else {
        return
    }
}



const validateBody = async (req, res, next) => {
    const endpoint = req.originalUrl.split('/')[1]
    let requestSchema = {}

    switch(endpoint) {
        case 'salary':
            requestSchema = schema.salary
            break;
        case 'envelopes':
            requestSchema = schema.envelopes
            break;
        case 'expenses':
            requestSchema = schema.expenses
            break;
        default:
            break;
    }

    try {
        const structure = validateStructure(req, endpoint, requestSchema)
    
        if (endpoint === 'salary') {
            validateSalary(req)
            await db.validateSumOfAllEnvelopesVsSalary(req, endpoint)
        } else if (endpoint === 'envelopes') {
            validateEnvelope(req)
            await db.validateSumOfAllEnvelopesVsSalary(req, endpoint)
        } else if (endpoint === 'expenses') {
            //
        } 
    } catch (error) {
        next(error)
    }

    next()
    
}

module.exports = {
    schema,
    validateStructure,
    validateEnvelope,
    validateSalary,
    validateBody
}