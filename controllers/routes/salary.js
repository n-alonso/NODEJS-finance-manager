const express = require('express')
const salaryRouter = express.Router()
const db = require('../queries')
const utils = require('../utilities')

salaryRouter.post('/', utils.validateSalary, db.doesSalaryExist, db.createSalary)
salaryRouter.get('/', db.getSalary)
salaryRouter.put('/', utils.validateSalary, db.updateSalary)

module.exports = salaryRouter