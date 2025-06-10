import React from 'react';

export default function TarefaForm({
  titulo,
  descricao,
  status,
  editandoId,
  setTitulo,
  setDescricao,
  setStatus,
  limparFormulario,
  enviarTarefa,
  atualizarTarefa,
}) {
  return (
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
          disabled={editandoId === null}
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
  );
}
