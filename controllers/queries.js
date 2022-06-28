const pool = require('../models/db_config')

// Salary
const checkSalary = (req, res, next) => {
    pool.query(`
        SELECT COUNT(*) FROM salary;
    `, (error, results) => {
        if (error) next(error)
        if (results.rows[0].count > 0) {
            let err = new Error(
                "'Salary.amount' is already set, please use 'PUT /salary' to update it instead."
            )
            err.code = 400
            err.public = true
            next(err)
        }
        next()
    })
}

const createSalary = (req, res, next) => {
    const amount = req.body.amount
    pool.query(`
        INSERT INTO salary (amount)
        VALUEs ($1)
        RETURNING *;
    `, [amount], (error, results) => {
        if (error) next(error)
        res.status(201).json(results.rows[0])
    })
}

const getSalary = (req, res, next) => {
    pool.query(`
        SELECT * FROM salary;    
    `, (error, results) => {
        if (error) next(error)
        res.status(200).json(results.rows[0])
    })
}

const updateSalary = (req, res, next) => {
    const amount = req.body.amount
    pool.query(`
        UPDATE salary
        SET amount = $1
        RETURNING *;
    `, [amount], (error, results) => {
        if (error) next(error)
        res.status(200).json(results.rows[0])
    })
}

// Envelopes
const getEnvelopes = (req, res, next) => {
    pool.query(`
        SELECT * FROM envelopes;
    `, (error, results) => {
        if (error) next(error)
        res.status(200).json(results.rows)
    })
}

const getEnvelopeById = (req, res, next) => {
    const id = req.params.id
    pool.query(`
        SELECT * FROM envelopes
        WHERE id = $1;
    `, [id], (error, response) => {
        if (error) next(error)
        res.status(200).json(response.rows[0])
    })
}

const createEnvelope = () => {}

const updateEnvelopeById = () => {}

const deleteEnvelopeById = () => {}

// Expenses
const getExpenses = () => {}

const createExpense = () => {}

const deleteExpenseById = () => {}

module.exports = {
    getSalary,
    updateSalary,
    createSalary,
    checkSalary,
    getEnvelopes,
    getEnvelopeById
}