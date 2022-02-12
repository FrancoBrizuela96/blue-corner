const express = require('express');
require('dotenv').config({path:'../.env'})
const mysql = require('mysql');

const app = express();
const {
    DB_USER, 
    DB_HOST, 
    PASSWORD, 
    DATABASE
} = process.env;

app.use(express.json());

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: PASSWORD,
    database: DATABASE
});

connection.connect( error => {
    if(error) throw error
    console.log('Connected to Database')
})

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000')
});