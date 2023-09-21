// setting up db for deploying

const Pool = require('pg').Pool;    // from postgres docs

require('dotenv').config()         // for using .env for secret info

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.DBPORT,
    database: process.env.POSTGRES_DATABASE,
    ssl: true
})

module.exports = pool
