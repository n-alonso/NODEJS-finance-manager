const express = require('express')
const salaryRouter = express.Router()
let salary = require('../app_modules/db').salary
const { validateSchema, validateType, validateLimitsVsSalary } = require('../app_modules/utilities')

salaryRouter.get('/', (req, res, next) => {
    res.send({ salary: salary })
})

salaryRouter.put('/', validateSchema, validateType, validateLimitsVsSalary, (req, res, next) => {
    salary = req.body.salary
    res.send({ salary: salary })
})

module.exports = salaryRouter