import React, { useEffect, useState } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');
  const [editandoId, setEditandoId] = useState(null); // qual tarefa está editando
  const API_URL = 'http://localhost:3000/tarefas';

  // Carrega tarefas do backend
  const carregarTarefas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  // Adiciona nova tarefa
  const enviarTarefa = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao }),
      });
      if (!res.ok) {
        const text = await res.text();
        alert('Erro ao criar tarefa: ' + text);
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

  // Limpa o formulário
  const limparFormulario = () => {
    setTitulo('');
    setDescricao('');
    setStatus('pendente');
    setEditandoId(null);
  };

  // Começa a editar uma tarefa
  const iniciarEdicao = (tarefa) => {
    setEditandoId(tarefa.id);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
    setStatus(tarefa.status);
  };

  // Atualiza tarefa existente via PUT
  const atualizarTarefa = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descricao, status }),
      });
      if (!res.ok) {
        const text = await res.text();
        alert('Erro ao atualizar tarefa: ' + text);
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

  // Traduz status para exibir
  const traduzirStatus = (s) => {
    switch (s) {
      case 'pendente': return 'Pendente';
      case 'em progresso': return 'Em progresso';
      case 'concluida': return 'Concluída';
      default: return s;
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Lista de Tarefas</h1>

      <form onSubmit={editandoId ? atualizarTarefa : enviarTarefa} style={{ marginBottom: 20 }}>
        <div>
          <label><b>Título:</b></label><br />
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            placeholder="Digite o título da tarefa"
          />
        </div>

        <div>
          <label><b>Descrição:</b></label><br />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ width: '100%', padding: 8, minHeight: 80 }}
            placeholder="Digite a descrição"
          />
        </div>

        <div>
          <label><b>Status:</b></label><br />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          >
            <option value="pendente">Pendente</option>
            <option value="em progresso">Em progresso</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: 10, padding: '10px 20px' }}>
          {editandoId ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
        </button>
        {editandoId && (
          <button
            type="button"
            onClick={limparFormulario}
            style={{ marginLeft: 10, padding: '10px 20px' }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h2>Tarefas Cadastradas</h2>
      {tarefas.length === 0 && <p>Nenhuma tarefa cadastrada.</p>}
      {tarefas.map((tarefa) => (
        <div key={tarefa.id} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 10 }}>
          <strong>{tarefa.titulo}</strong><br />
          <small>{tarefa.descricao}</small><br />
          <b>Status:</b> {traduzirStatus(tarefa.status)}<br />
          <b>Criado em:</b> {new Date(tarefa.data_criacao).toLocaleDateString()}<br />
          <b>Concluído em:</b> {tarefa.data_conclusao ? new Date(tarefa.data_conclusao).toLocaleDateString() : '—'}<br />
          <button
            onClick={() => iniciarEdicao(tarefa)}
            style={{ marginTop: 5, padding: '5px 10px' }}
          >
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
