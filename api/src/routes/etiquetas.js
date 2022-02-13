const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.get('/', (req, res) => {
        connection.query('SELECT * FROM etiquetas', (error, rows) => {
            if( error ) console.log(error);
            res.json(rows);
        })
});

router.post('/', (req, res) => {
    const { Nombre, Id_producto } = req.body;
    const etiqueta = {
        Nombre,
        Id_producto
    }
    const etiquetasActuales = []
    connection.query('SELECT Nombre FROM etiquetas WHERE Id_producto = ?', [Id_producto], (error, rows) => {
        if ( error ) {
            res.status(500).send(error);
        } else {
            rows.map( etiqueta => etiquetasActuales.push(etiqueta.Nombre));
        }
        
        if(etiquetasActuales.includes(Nombre)) {
            res.status(400).send('El producto ya posee esa etiqueta')
        } else {
            connection.query('INSERT INTO etiquetas SET ?', [etiqueta], (error, rows) => {
                if ( error ) res.status(500).send(error);
                else res.send('Etiqueta creada correctamente');
            })
        }
    })  
});

module.exports = router;