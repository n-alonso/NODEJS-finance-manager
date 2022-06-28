const Pool = require('pg').Pool

const pool = new Pool({
    user: 'me',
    password: 'password',
    database: 'model',
    host: 'localhost',
    port: 5432
})

module.exports = pool