const express = require('express');
const router = express.Router();
const tarefasControllers = require('../controllers/tarefasControllers');

    //Crias as Rotas

router.post('/', tarefasControllers.criarTarefas);
router.get('/', tarefasControllers.listarTarefas);
router.get('/status', tarefasControllers.filtrarTarefas);
router.put('/:id', tarefasControllers.atualizarTarefas);
router.delete('/:id', tarefasControllers.deletarTarefas);
router.post('/data', tarefasControllers.criarEstimulandodata);
router.get('/por-usuario', tarefasControllers.listarTarefasPorUsuario);


module.exports = router;