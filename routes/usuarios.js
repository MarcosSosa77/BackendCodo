const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.get('/', userController.ObtenerTodosLosUsuarios);
router.get('/:id',userController.ObtenerUsuarioPorId);
router.post('/',userController.crearUsuario);
router.put('/:id',userController.ActualizarUsuario);
router.delete('/:id',userController.BorrarUsuario);



module.exports = router;

