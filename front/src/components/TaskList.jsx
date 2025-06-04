import React from 'react';

function traduzirStatus(status) {
  switch (status) {
    case 'pendente': return 'Pendente';
    case 'em progresso': return 'Em Progresso';
    case 'concluida': return 'Concluída';
    default: return status;
  }
}

function TaskList({ tasks }) {
  return (
    <div>
      <h2>Tarefas</h2>
      {tasks.map((task) => (
        <div key={task.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <strong>{task.titulo}</strong><br />
          {task.descricao}<br />
          <b>Status:</b> {traduzirStatus(task.status)}<br />
          <b>Data de Criação:</b> {new Date(task.data_criacao).toLocaleDateString()}<br />
          <b>Data de Conclusão:</b> {task.data_conclusao ? new Date(task.data_conclusao).toLocaleDateString() : '—'}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
