import React, { useEffect, useState } from 'react';
import TarefaForm from './components/TarefaForm';
import ListarTarefas from './components/ListarTarefas';
import CadastroUsuario from './components/CadastroUsuario';
import LoginUsuario from './components/LoginUsuario';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');
  const [editandoId, setEditandoId] = useState(null);

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [aba, setAba] = useState('login');
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const API_TAREFAS = 'http://localhost:3000/tarefas';
  const API_USUARIOS = 'http://localhost:3000/usuarios';

  const carregarTarefas = async () => {
    if (!usuarioLogado) {
      setTarefas([]);
      return;
    }
    try {
      const res = await fetch(`${API_TAREFAS}/por-usuario?usuarioId=${usuarioLogado.id}`);
      if (!res.ok) throw new Error('Erro ao carregar tarefas');
      const data = await res.json();
      setTarefas(data);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar tarefas');
    }
  };

  const enviarTarefa = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }
    if (!usuarioLogado) {
      alert('Usuário não logado.');
      return;
    }

    try {
      const res = await fetch(API_TAREFAS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descricao,
          status,
          usuarioId: usuarioLogado.id,
        }),
      });
      if (!res.ok) {
        const texto = await res.text();
        alert('Erro ao criar tarefa: ' + texto);
        return;
      }
      alert('Tarefa criada com sucesso!');
      limparFormulario();
      carregarTarefas();
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.error(error);
    }
  };

  const atualizarTarefa = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }
    try {
      const res = await fetch(`${API_TAREFAS}/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          descricao,
          status,
          usuarioId: usuarioLogado.id,
        }),
      });
      if (!res.ok) {
        const texto = await res.text();
        alert('Erro ao atualizar tarefa: ' + texto);
        return;
      }
      alert('Tarefa atualizada com sucesso!');
      limparFormulario();
      carregarTarefas();
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.error(error);
    }
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    if (!nomeUsuario.trim() || !email.trim() || !senha.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      const res = await fetch(API_USUARIOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nomeUsuario, email, senha }),
      });

      if (res.status === 409) {
        const texto = await res.text();
        alert('Erro: ' + texto);
        return;
      }

      if (!res.ok) {
        const texto = await res.text();
        alert('Erro ao registrar: ' + texto);
        return;
      }

      const usuario = await res.json();
      alert('Usuário registrado com sucesso!');
      setNomeUsuario('');
      setEmail('');
      setSenha('');

      setUsuarioLogado(usuario);
      setAba('tarefas');
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.error(error);
    }
  };

  const fazerLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !senha.trim()) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      const res = await fetch(`${API_USUARIOS}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (!res.ok) {
        const texto = await res.text();
        alert('Erro: ' + texto);
        return;
      }

      const usuario = await res.json();
      alert('Login efetuado com sucesso!');
      setUsuarioLogado(usuario);
      setEmail('');
      setSenha('');
      setAba('tarefas');
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
      console.error(error);
    }
  };

  const limparFormulario = () => {
    setTitulo('');
    setDescricao('');
    setStatus('pendente');
    setEditandoId(null);
  };

  const iniciarEdicao = (tarefa) => {
    setEditandoId(tarefa.id);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
    setStatus(tarefa.status);
  };

  useEffect(() => {
    carregarTarefas();
  }, [usuarioLogado]);

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 600,
        margin: 'auto',
        backgroundColor: '#f7f9fc',
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {(aba === 'login' || aba === 'cadastro') && (
        <div style={{ marginBottom: 20, textAlign: 'center' }}>
          <button
            onClick={() => setAba('login')}
            disabled={aba === 'login'}
            style={{
              marginRight: 10,
              padding: '8px 16px',
              borderRadius: 5,
              backgroundColor: aba === 'login' ? '#007bff' : '#e0e0e0',
              color: aba === 'login' ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
          <button
            onClick={() => setAba('cadastro')}
            disabled={aba === 'cadastro'}
            style={{
              padding: '8px 16px',
              borderRadius: 5,
              backgroundColor: aba === 'cadastro' ? '#007bff' : '#e0e0e0',
              color: aba === 'cadastro' ? 'white' : '#333',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cadastro
          </button>
        </div>
      )}

      {aba === 'login' && (
        <LoginUsuario
          email={email}
          senha={senha}
          setEmail={setEmail}
          setSenha={setSenha}
          fazerLogin={fazerLogin}
        />
      )}

      {aba === 'cadastro' && (
        <CadastroUsuario
          nomeUsuario={nomeUsuario}
          email={email}
          senha={senha}
          setNomeUsuario={setNomeUsuario}
          setEmail={setEmail}
          setSenha={setSenha}
          registrarUsuario={registrarUsuario}
        />
      )}

      {aba === 'tarefas' && usuarioLogado && (
        <>
          <h2 style={{ textAlign: 'center', color: '#333' }}>
            Bem-vindo, {usuarioLogado.nome}
          </h2>

          <button
            onClick={() => {
              setUsuarioLogado(null);
              setTarefas([]);
              setAba('login');
            }}
            style={{
              display: 'block',
              margin: '10px auto 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '8px 16px',
              borderRadius: 5,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Sair
          </button>

          <TarefaForm
            titulo={titulo}
            descricao={descricao}
            status={status}
            editandoId={editandoId}
            setTitulo={setTitulo}
            setDescricao={setDescricao}
            setStatus={setStatus}
            limparFormulario={limparFormulario}
            enviarTarefa={enviarTarefa}
            atualizarTarefa={atualizarTarefa}
          />

          <ListarTarefas tarefas={tarefas} iniciarEdicao={iniciarEdicao} />
        </>
      )}
    </div>
  );
}

export default App;
