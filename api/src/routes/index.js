const { Router } = require('express');
const productosRoute = require('./productos')
// Importar todos los routers;
const router = Router();

router.use('/productos', productosRoute);
// Configurar los routers

module.exports = router;
