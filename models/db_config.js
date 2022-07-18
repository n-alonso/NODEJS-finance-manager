const Pool = require('pg').Pool

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,	//use DATABASE_URL environment variable from Heroku app 
    ssl: {
      rejectUnauthorized: false // don't check for SSL cert
    }
})

module.exports = pool
