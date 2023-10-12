// setting up db for deploying

const Pool = require('pg-pool');    // from postgres docs
const url = require('url');

require('dotenv').config()         // for using .env for secret info

const params = url.parse(process.env.POSTGRES_URL);
const auth = params.auth.split(':');

const config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: false
};

const pool = new Pool(config);



// const pool = new Pool({
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     host: process.env.POSTGRES_HOST,
//     port: process.env.DBPORT,
//     database: process.env.POSTGRES_DATABASE
// })

module.exports = pool
