const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const envelopesRouter = require('./controller/routes/envelopes.js')
const salaryRouter = require('./controller/salary')

// Parse body and log all requests
app.use(bodyParser.json())
app.use(morgan('dev'))

// Mount Routers in the appropriate paths
app.use('/envelopes', envelopesRouter)
app.use('/salary', salaryRouter)

// Send a formatted response for all caught errors
app.use((err, req, res, next) => {
    // If the error is approved to be shown to the public, send it in the response
    if (err.public) {
        res.send({
            status: err.status,
            error: err.message
        })
    } else {
        // Otherwise, show a generic response
        res.send({
            status: 500,
            //error: 'Oops! Something went wrong.'
            error: err.stack
        })
    }
})

// Set the listening port for the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})