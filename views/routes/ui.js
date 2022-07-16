const express = require('express')
const uiRouter = express.Router()
const path = require('path')

const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs') //'../../openapi.yaml'
const oasPath = path.resolve(__dirname, '../../openapi.yaml')
const swaggerDocument = YAML.load(oasPath)

uiRouter.use(swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = uiRouter