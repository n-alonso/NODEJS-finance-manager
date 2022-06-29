const app = require('../server')

// Utility functions
const validateSalary = (req, res, next) => {
    const amount = req.body.amount

    if (amount < 0) {
        let err = new Error(
            "'Salary.amount' cannot be lower than '0'."
        )
        err.code = 400
        err.public = true
        next(err)
    }
    if (typeof amount !== 'number') {
        let err = new Error(
            "'Salary.amount' needs to be of the 'type: number'."
        )
        err.code = 400
        err.public = true
        next(err)
    } else {
        next()
    }
}

module.exports = {
    validateSalary
}