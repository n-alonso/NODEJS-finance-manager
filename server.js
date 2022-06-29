const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./controllers/queries')

const app = express()
const salaryRouter = require('./controllers/routes/salary')
const envelopesRouter = require('./controllers/routes/envelopes.js')

app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send({ "test": "this is a test response" })
})

app.use('/salary', salaryRouter)
app.use('/envelopes', envelopesRouter)

app.use((err, req, res, next) => {
    if (err.public) {
        res.send({
            code: err.code,
            error: err.message
        })
    } else {
        res.send({
            code: 500,
            error: err.stack
        })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

module.exports = app