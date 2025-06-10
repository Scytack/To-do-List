import React from 'react';

const traduzirStatus = (s) => {
  switch (s) {
    case 'pendente': return 'Pendente';
    case 'em progresso': return 'Em progresso';
    case 'concluida': return 'Concluída';
    default: return s;
  }
};

export default function ListaTarefas({ tarefas, iniciarEdicao }) {
  if (tarefas.length === 0) return <p>Nenhuma tarefa cadastrada.</p>;

  return (
    <>
      <h2>Tarefas Cadastradas</h2>
      {[...tarefas].reverse().map((tarefa) => (
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
    </>
  );
}
