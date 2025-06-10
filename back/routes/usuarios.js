const express = require('express');
const router = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');

router.post('/', usuariosControllers.criarUsuario);
router.get('/', usuariosControllers.listarUsuarios);  // <- essa rota GET!
router.post('/login', usuariosControllers.loginUsuario);


module.exports = router;
