const conexao = require('../db/conexao')

    // Rota Post
    exports.criarTarefas = (req, res) => {
        const { titulo, descricao, usuarioId } = req.body;
    
        if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
            return res.status(400).send('Nome da tarefa é obrigatório.');
        }
        if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
            return res.status(400).send('A descrição é obrigatória.');
        }
        if (!usuarioId) {
            return res.status(400).send('ID do usuário é obrigatório.');
        }
    
        conexao.query(
            'INSERT INTO tarefas (titulo, descricao, usuarioId) VALUES (?, ?, ?)',
            [titulo, descricao, usuarioId],
            (err) => {
                if (err) {
                    console.error('Erro ao criar tarefa:', err);
                    return res.status(500).send('Erro ao criar tarefa');
                }
                res.status(201).send('Tarefa criada com sucesso!');
            }
        );
    };
    

    //Rota Get Geral
exports.listarTarefas = (req, res) => {
    conexao.query('SELECT * FROM  tarefas', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar tarefas')
        }

        res.status(200).send(results)
    });
};

    //Rota Get Status
exports.filtrarTarefas = (req, res) => {
    const status = req.query.status;

    conexao.query('SELECT * FROM  tarefas WHERE status = ?', [status], (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar tarefas')
        }

        res.status(200).send(results)
    });
};

    //Rota Put
exports.atualizarTarefas = (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    // Validações básicas
    if (!descricao || typeof descricao !== 'string' || descricao.trim() === '') {
        return res.status(400).send('A descrição é obrigatória e deve ser uma string não vazia.');
    }

    // Buscar tarefa atual
    conexao.query('SELECT * FROM tarefas WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar tarefa' });
        if (results.length === 0) return res.status(404).json({ erro: 'Tarefa não encontrada' });

        const tarefaAtual = results[0];

        // Pega os novos valores, ou mantém os antigos
        const novoTitulo = titulo || tarefaAtual.titulo;
        const novoDescricao = descricao || tarefaAtual.descricao;
        const novoStatus = status || tarefaAtual.status;

        // Define nova data_conclusao se o status mudou pra 'concluida'
        let dataConclusao = tarefaAtual.data_conclusao;

        if (tarefaAtual.status !== 'concluida' && novoStatus === 'concluida') {
            dataConclusao = new Date(); // define data de conclusão
        } else  if (novoStatus === 'em progresso' || novoStatus === 'pendente') {
            dataConclusao = null; // limpa se voltar para em progresso ou pendente
        }



        // Atualiza no banco
        conexao.query(
            'UPDATE tarefas SET titulo = ?, descricao = ?, status = ?, data_conclusao = ? WHERE id = ?',
            [novoTitulo, novoDescricao, novoStatus, dataConclusao, id],
            (err2, result) => {
                if (err2) 
                    return res.status(500).json('Erro ao atualizar tarefa');
                res.status(200).send('Tarefa atualizada com sucesso');
            }
        );
    });
};

    //Rota Delete
  exports.deletarTarefas = (req, res) => {
    const { id } = req.params;
    conexao.query('DELETE FROM tarefas WHERE id = ?', [id], (err, results) => {
      if (err) {
          return res.status(500).send('Erro ao deletar');
      }
      if (results.affectedRows === 0) {
          return res.status(404).send('Tarefa não encontrada');
      }
      res.status(200).send('Tarefa deletada com sucesso');
    });
  };

  function isValidDate(dateString) {
    return !isNaN(Date.parse(dateString));
}


function isAtLeastOneDayAfter(dateEntrega, dateCriacao) {
    const dEntrega = new Date(dateEntrega);
    const dCriacao = new Date(dateCriacao);

    dEntrega.setHours(0, 0, 0, 0);
    dCriacao.setHours(0, 0, 0, 0);

    return dEntrega > dCriacao;
}

// Rota data
exports.criarEstimulandodata = (req, res) => {
    const { titulo, descricao, data_entrega } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
        return res.status(400).send('O título da tarefa é obrigatório.');
    }

    if (data_entrega) {
        if (!isValidDate(data_entrega)) {
            return res.status(400).send('Data de entrega inválida.');
        }

        const hoje = new Date();

        if (!isAtLeastOneDayAfter(data_entrega, hoje)) {
            return res.status(400).send('A data de entrega deve ser pelo menos 2 dias após a data de criação.');
        }
    }

    const query = 'INSERT INTO tarefas (titulo, descricao, data_entrega) VALUES (?, ?, ?)';
    const valores = [titulo, descricao, data_entrega || null];

    conexao.query(query, valores, (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao criar tarefa.');
        }

        res.status(201).send('Tarefa criada com sucesso.');
    });
};

exports.listarTarefasPorUsuario = (req, res) => {
    const usuarioId = req.query.usuarioId; // vem do frontend
  
    if (!usuarioId) {
      return res.status(400).send('ID do usuário é obrigatório.');
    }
  
    conexao.query(
      'SELECT * FROM tarefas WHERE usuarioId = ?',
      [usuarioId],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erro interno.');
        }
        res.json(results);
      }
    );
  };
  