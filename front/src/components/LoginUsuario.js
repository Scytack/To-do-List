import React from 'react';

function LoginUsuario({ email, senha, setEmail, setSenha, fazerLogin }) {
  return (
    <form onSubmit={fazerLogin}>
      <h2>Login</h2>
      <div>
        <label>Email:</label><br />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Senha:</label><br />
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginUsuario;
