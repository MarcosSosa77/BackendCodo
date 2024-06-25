const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


// Otras rutas CRUD de usuarios
router.get('/', userController.ObtenerTodosLosUsuarios);
router.get('/:id', userController.obtenerUsuarioPorId);
//router.post('/', userController.CrearUsuario);
//router.put('/:id', userController.ActualizarUsuario);

router.post('/', userController.upload.single('archivo'), userController.CrearUsuario);
router.put('/:id', userController.upload.single('archivo'), userController.ActualizarUsuario);


router.delete('/:id', userController.BorrarUsuario);

module.exports = router;
