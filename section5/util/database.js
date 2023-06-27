const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config()
const pool=mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node-udemy',
    password : process.env.MYSQL_PASSWORD
});

module.exports = pool.promise()