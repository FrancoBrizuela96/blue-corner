const { Router } = require('express');
const productosRoute = require('./productos')
const etiquetasRoute = require('./etiquetas')
// Importar todos los routers;
const router = Router();

router.use('/productos', productosRoute);
// Configurar los routers

module.exports = router;
