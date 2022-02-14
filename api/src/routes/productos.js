const { Router } = require('express');
const router = Router();
const connection = require('../database.js');

//Get all Products
router.get('/', (req, res) => {
        connection.query('SELECT * FROM productos', (error, rows) => {
            if( error ) console.log(error);
            res.json(rows);
        })
});

//Get one Product
router.get('/:Id_producto', (req, res) => {
    const { Id_producto } = req.params;
    const { Nombre } = req.query;
    connection.query('SELECT productos.Id_producto, productos.Nombre AS productoNombre, etiquetas.Id_etiqueta, etiquetas.Nombre AS etiquetaNombre FROM productos JOIN etiquetas ON productos.Id_producto = etiquetas.Id_producto WHERE etiquetas.Id_producto = ?', [Id_producto], (error, rows) => {
        if( error ) console.log(error);
        if(rows.length > 0) {
            const etiquetas = rows.map( row => {
                const {Id_etiqueta, etiquetaNombre} = row
                return {
                    Id_etiqueta, 
                    etiquetaNombre
                }
            });
            const producto = {
                Id_producto,
                Nombre: rows[0]?.productoNombre,
                Etiquetas: etiquetas
            }
            res.json(producto)
        } else {
            const producto = {
                Id_producto,
                Nombre,
                Etiquetas: []
            }
            res.json(producto)
        }
    })
});

//Post 1 product
router.post('/', (req, res) => {
    const { Nombre, etiquetas = [] } = req.body;
    
    if (!Nombre) {
        res.status(400).send('Falta ingresar un parámetro')
        return
    }; 
    connection.query(`INSERT INTO productos set ?`, [{Nombre}], (error, rows) => {
        if ( error ) {
            res.status(500).send(error)
            return
        };
        const Id_producto = rows.insertId;

        if (etiquetas.length > 0) {
            const etiquetastoArray = etiquetas.map( etiqueta => [Id_producto, etiqueta]);
            connection.query('INSERT INTO etiquetas (Id_producto, Nombre) VALUES ?', [etiquetastoArray], (error, rows) => {
                if ( error ) {
                    res.status(500).send(error)
                    return
                }
                res.json({
                    Nombre,
                    Id_producto,
                    etiquetas: etiquetas,
                    response: 'Producto y etiquetas creada exitosamente'
                });
            })
        } else {
            res.json({
                Nombre,
                Id_producto,
                response: 'Producto creado exitosamen sin etiquetas'
            })
        }
    })
})

// Update 1 product and/or its categories
router.put('/:Id_producto', (req, res) => {
    const { Id_producto } = req.params;
    const { newName, etiquetas } = req.body;
    connection.query(`UPDATE productos SET Nombre = ? WHERE Id_producto = ?`, [newName, Id_producto], error => {if(error) res.status(500).send(error)});
    connection.query(`DELETE FROM etiquetas WHERE Id_producto = ?`, [Id_producto], error => {if(error) res.status(500).send(error)});
    if(etiquetas.length > 0) {
        const etiquetastoArray = etiquetas.map( etiqueta => [Id_producto, etiqueta]);
        connection.query('INSERT INTO etiquetas (Id_producto, Nombre) VALUES ?', [etiquetastoArray], (error, rows) => {
            if ( error ) res.status(500).send(error);
            else res.json({
                newName,
                Id_producto,
                response: 'Producto y etiquetas actualizados correctamente'
            });
        })
    } else {
        res.json({
            newName,
            Id_producto,
            response: 'Nombre del producto actualizado'
        })
    }
})

// Delete 1 product and its categories
router.delete('/:Id_producto', (req, res) => {
    const { Id_producto } = req.params;
    connection.query(`DELETE FROM etiquetas WHERE Id_producto = ?`, [Id_producto], error => {if(error) res.status(500).send(error)});
    connection.query(`DELETE FROM productos WHERE Id_producto = ?`, [Id_producto], (error) => {
        if(error) res.status(500).send(error)
        else res.send('Producto eliminado correctamente!')
    });
})

module.exports = router;