const conexao = require('../db/conexao');
const bcrypt = require('bcryptjs');

exports.criarUsuario = (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).send('Nome é obrigatório.');
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return res.status(400).send('Email é obrigatório.');
    }
    if (!senha || typeof senha !== 'string' || senha.trim() === '') {
        return res.status(400).send('Senha é obrigatória.');
    }

    // Verifica se o email já existe
    conexao.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco:', err);
            return res.status(500).send('Erro interno.');
        }

        if (results.length > 0) {
            return res.status(409).send('Email já cadastrado.');
        }

        // Hasheia a senha
        bcrypt.hash(senha, 10, (err, senhaHasheada) => {
            if (err) {
                console.error('Erro ao hashear senha:', err);
                return res.status(500).send('Erro ao processar senha.');
            }

            // Insere o novo usuário
            conexao.query(
                'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                [nome, email, senhaHasheada],
                (err, result) => {
                    if (err) {
                        console.error('Erro ao inserir usuário:', err);
                        return res.status(500).send('Erro ao criar usuário.');
                    }

                    res.status(201).send('Usuário criado com sucesso!');
                }
            );
        });
    });
};

// Em usersControllers.js (ou onde está seu controller)
exports.listarUsuarios = (req, res) => {
    conexao.query('SELECT id, nome, email, senha FROM usuarios', (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuários:', err);
        return res.status(500).send('Erro interno.');
      }
      res.json(results);
    });
  };
  
  exports.loginUsuario = (req, res) => {
    const { email, senha } = req.body;
  
    if (!email || !senha) {
      return res.status(400).send('Email e senha são obrigatórios.');
    }
  
    conexao.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro interno.');
      }
  
      if (results.length === 0) {
        return res.status(401).send('Email ou senha inválidos.');
      }
  
      const usuario = results[0];
  
      bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erro ao validar senha.');
        }
  
        if (!isMatch) {
          return res.status(401).send('Email ou senha inválidos.');
        }
  
        // Remove a senha do objeto para não enviar ao cliente
        delete usuario.senha;
  
        res.json(usuario);
      });
    });
  };

  
  