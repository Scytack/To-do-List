import React from 'react';

export default function CadastroUsuario({
  nomeUsuario,
  email,
  senha,
  setNomeUsuario,
  setEmail,
  setSenha,
  registrarUsuario,
}) {
  return (
    <>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={registrarUsuario} style={{ marginBottom: 30 }}>
        <div>
          <label><b>Nome:</b></label><br />
          <input
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <label><b>Email:</b></label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            placeholder="Digite seu email"
          />
        </div>

        <div>
          <label><b>Senha:</b></label><br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            placeholder="Digite sua senha"
          />
        </div>

        <button type="submit" style={{ marginTop: 10, padding: '10px 20px' }}>
          Registrar
        </button>
      </form>
    </>
  );
}
