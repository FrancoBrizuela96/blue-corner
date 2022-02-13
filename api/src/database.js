const mysql = require('mysql2');
const {
    DB_USER, 
    DB_HOST, 
    PASSWORD, 
    DATABASE,
} = process.env;

//Conexion a MySQL
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: PASSWORD,
    database: DATABASE
});

module.exports = connection;