const { Router } = require('express');
const { check } = require('express-validator');
const { crearMateria, editarMateria, obtenerMaterias, borrarMateria } = require('../controllers/materias');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//obtener todas
router.get( '/getMaterias', obtenerMaterias);

//crear una nueva materia.
router.post( '/newMateria', [
    check('nombreMateria', 'El nombre es obligatorio').not().isEmpty(),
    check('horario', 'El horario es un campo obligatorio ').not().isEmpty().isString(), 
    check('cupos', 'Debe imgresar los cupos.! ').not().isEmpty().isInt(),
    check('grupo', 'Ingrese el numero de grupo.!').not().isEmpty().isInt(),
    validarCampos
], crearMateria );

//actualizar
router.patch( '/editMateria/:id', [
    check('horario', 'El horario es un campo obligatorio ').not().isEmpty().isString(), 
    check('cupos', 'Debe imgresar los cupos.! ').not().isEmpty().isInt(),
    check('grupo', 'Ingrese el numero de grupo.!').not().isEmpty().isInt(),
    validarCampos
], editarMateria);

//eliminar
router.delete( '/deleteMateria/:id', [
    validarCampos
], borrarMateria);















module.exports = router;