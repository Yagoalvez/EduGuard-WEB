import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoadingLocal(true);

    try {
      const loggedUser = await login(email, senha);
      if (loggedUser?.tipo_usuario === 'responsavel') {
        navigate('/responsavel/portal');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErro(err.message || 'Erro ao fazer login');
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/assets/eduguard-logo-login.png" alt="EduGuard" className="login-logo" />
        <p className="login-subtitle">Sistema inteligente de gestão escolar infantil.</p>

        <div className="login-card">
          <div className="login-card-header">
            <h2>Acessar sistema</h2>
            <p>Entre com suas credenciais para continuar</p>
          </div>

          {erro && <div className="login-error">{erro}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">E-mail ou CPF</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com ou 000.000.000-00"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="login-btn" disabled={loadingLocal}>
              {loadingLocal ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
