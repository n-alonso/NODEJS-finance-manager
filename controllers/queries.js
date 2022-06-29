const pool = require('../models/db_config')

// Utility Queries
const doesIdExist = async (req, res, next) => {
    const table = req.originalUrl.split('/')[1]
    const id = req.params.id

    pool.query(`
        SELECT * FROM ${table}
        WHERE id = $1;
    `, [id], (error, response) => {
        if (error) next(error)
        if (response.rows.length === 0) {
            let err = new Error(
                "Bad request. '" + table + "' with 'id: " + id + "' not found."
            )
            err.code = 404
            err.public = true
            next(err)
        } else {
            next()
        }
    }) 
}

const doesSalaryExist = (req, res, next) => {
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
        } else {
            next()
        }
    })
}

// Salary
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

const createEnvelope = () => {}

// Envelopes/id
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

const deleteEnvelopeById = async (req, res, next) => {
    const id = req.params.id

    await Promise.all([
        pool.query(`DELETE FROM expenses WHERE envelope_id = $1 RETURNING *;`, [id]),
        pool.query(`DELETE FROM envelopes WHERE id = $1 RETURNING *;`, [id])
    ])
        .then(([expensesResponse, envelopesResponse]) => {
            res.status(200).json({
                message: "Deleted the requested envelope and all associated expenses.",
                deletedEnvelope: envelopesResponse.rows[0],
                deletedExpenses: expensesResponse.rows
            })
        })
        .catch(error => next(error))
}

const updateEnvelopeById = () => {}

// Expenses
const getExpenses = () => {}

const createExpense = () => {}

const deleteExpenseById = () => {}

module.exports = {
    doesIdExist,
    doesSalaryExist,
    getSalary,
    updateSalary,
    createSalary,
    getEnvelopes,
    getEnvelopeById,
    deleteEnvelopeById
}