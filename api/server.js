const express = require('express'); 
require('dotenv').config()
const router = require('./src/routes/index.js');
const connection = require('./src/database.js')
const cors = require('cors');
const app = express();
const {
    PORT
} = process.env;

//Middlewares
app.use(express.json());
app.use(cors()) //Para todo el mundo (*)
app.use('/api', router);
//Conexion a MySQL
connection.connect( error => {
    if(error) throw error
    console.log('Connected to Database')
})
//Servidor corriendo...
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});