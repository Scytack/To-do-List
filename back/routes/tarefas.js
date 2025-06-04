const express = require('express');
const router = express.Router();
const tarefasControllers = require('../controllers/tarefasControllers');

    //Crias as Rotas

router.post('/', tarefasControllers.criarTarefas);
router.get('/', tarefasControllers.listarTarefas);
router.get('/status', tarefasControllers.filtrarTarefas);
router.put('/:id', tarefasControllers.atualizarTarefas);
router.delete('/:id', tarefasControllers.deletarTarefas);

module.exports = router;