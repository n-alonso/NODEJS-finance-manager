const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./controllers/queries')
const utils = require('./controllers/utilities')

const app = express()
const salaryRouter = require('./controllers/routes/salary')
const envelopesRouter = require('./controllers/routes/envelopes.js')
const expensesRouter = require('./controllers/routes/expenses')
const uiRouter = require('./views/routes/ui')

app.use(bodyParser.json())
app.use(morgan('dev', { 
    skip: (req, res) => process.env.NODE_ENV === 'test'
 }))

app.use('/ui', uiRouter)
app.use('/salary', salaryRouter)
app.use('/envelopes', envelopesRouter)
app.use('/expenses', expensesRouter)

app.use(utils.handleInvalidPaths)
app.use(utils.handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

module.exports = app
