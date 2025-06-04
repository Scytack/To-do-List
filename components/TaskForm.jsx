import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddTask({ titulo, descricao, status });
    setTitulo('');
    setDescricao('');
    setStatus('pendente');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Título:</label>
      <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

      <label>Descrição:</label>
      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />

      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pendente">Pendente</option>
        <option value="em progresso">Em Progresso</option>
        <option value="concluida">Concluída</option>
      </select>

      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}

export default TaskForm;
