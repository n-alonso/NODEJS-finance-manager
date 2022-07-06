const express = require('express')
const app = require('../../server')
const salaryRouter = express.Router()
const db = require('../queries')
const utils = require('../utilities')

salaryRouter.post('/', utils.validateBody, db.doesSalaryExist, db.createSalary)
salaryRouter.get('/', db.getSalary)
salaryRouter.put('/', utils.validateBody, db.updateSalary)

salaryRouter.use('/', utils.handleInvalidMethods)

module.exports = salaryRouter