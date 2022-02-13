const { Router } = require('express');
const productosRoute = require('./productos')
const etiquetasRoute = require('./etiquetas')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use('/productos', productosRoute);
router.use('/etiquetas', etiquetasRoute);
// Configurar los routers

module.exports = router;
