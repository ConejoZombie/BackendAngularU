const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerClases, crearClase, editarClase, borrarClase } = require('../controllers/clases');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//obtener todas
router.get( '/getClases', obtenerClases);

//crear una nueva materia.
router.post( '/newClase',
    validarCampos
, crearClase );

//actualizar
router.patch( '/editClase/:id', [
    validarCampos
], editarClase);

//eliminar
router.delete( '/deleteClase/:id', [
    validarCampos
], borrarClase);















module.exports = router;