const express = require('express')
const expensesRouter = express.Router()
const db = require('../queries')
const utils = require('../utilities')

expensesRouter.param('id', db.doesIdExist)

expensesRouter.get('/', db.getExpenses)
expensesRouter.post('/', db.createExpense)
expensesRouter.delete('/', db.deleteExpenses)

expensesRouter.delete('/:id', db.deleteExpenseById)

expensesRouter.use('/', utils.handleInvalidMethods)
expensesRouter.use('/:id', utils.handleInvalidMethods)

module.exports = expensesRouter