const express = require('express')
const salaryRouter = express.Router()
const db = require('../queries')
const utils = require('../utilities')

salaryRouter.post('/', utils.validateBody, db.doesSalaryExist, db.createSalary)
salaryRouter.get('/', db.getSalary)
salaryRouter.put('/', utils.validateBody, db.updateSalary)

module.exports = salaryRouter