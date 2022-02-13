const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

router.get('/', (req, res) => {
        connection.query('SELECT * FROM productos', (error, rows) => {
            if( error ) console.log(error);
            res.json(rows);
        })
});

router.post('/', (req, res) => {
    const { Nombre } = req.body;
    if (!Nombre) res.status(400).send('Falta ingresar un parámetro');
    const producto = {
        Nombre
    }

    connection.query(`INSERT INTO productos set ?`, [producto], (error, rows) => {
        if ( error ) res.status(500).send(error);
        if(rows.serverStatus === 2) res.send(`Producto ${Nombre} creado correctamente`);
        else res.status(500).send('Algo ha salido mal');
    })
})

router.delete('/:Id_producto', (req, res) => {
    const { Id_producto } = req.params;
    if (!Id_producto) res.status(400).send('Falta ingresar un parámetro');

    connection.query(`DELETE FROM productos WHERE Id_producto = ?`, [Id_producto], (error, rows) => {
        if ( error ) res.status(500).send(error);
        if ( rows.affectedRows === 0 ) res.status(500).send('No existe un producto con ese ID');
        else res.send(`Producto eliminado correctamente`);
    })
})

module.exports = router;