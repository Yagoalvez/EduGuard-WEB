import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';

import { Alunos } from './pages/Alunos';
import { Turmas } from './pages/Turmas';
import { Ponto } from './pages/Ponto';
import { Rotina } from './pages/Rotina';
import { Avisos } from './pages/Avisos';
import { Responsaveis } from './pages/Responsaveis';
import { Funcionarios } from './pages/Funcionarios';
import { Logs } from './pages/Logs';
import { Perfil } from './pages/Perfil';
import { Historico } from './pages/Historico';
import { ResponsavelPortal } from './pages/ResponsavelPortal';
import { useAuth } from './context/AuthContext';

function PontoGuard({ children }) {
  const { user } = useAuth();
  const funcao = user?.funcao?.toLowerCase();
  if (funcao !== 'diretor' && funcao !== 'porteiro') {
    return <Navigate to="/alunos" replace />;
  }
  return children;
}

function RestrictedRouteGuard({ children }) {
  const { user } = useAuth();
  const funcao = user?.funcao?.toLowerCase();
  if (funcao === 'porteiro') {
    return <Navigate to="/ponto" replace />;
  }
  return children;
}

function IndexRedirect() {
  const { user } = useAuth();
  const isPorteiro = user?.funcao?.toLowerCase() === 'porteiro';
  return <Navigate to={isPorteiro ? "/ponto" : "/alunos"} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/responsavel/portal" element={<ProtectedRoute allowedTypes={['responsavel']}><ResponsavelPortal /></ProtectedRoute>} />

          <Route path="/" element={<ProtectedRoute allowedTypes={['funcionario']}><Layout /></ProtectedRoute>}>
            <Route index element={<IndexRedirect />} />
            <Route path="dashboard" element={<IndexRedirect />} />
            <Route path="alunos" element={<Alunos />} />
            <Route path="responsaveis" element={<Responsaveis />} />
            <Route path="equipe" element={<RestrictedRouteGuard><Funcionarios /></RestrictedRouteGuard>} />
            <Route path="turmas" element={<RestrictedRouteGuard><Turmas /></RestrictedRouteGuard>} />
            <Route path="ponto" element={<PontoGuard><Ponto /></PontoGuard>} />
            <Route path="medicacao" element={<Navigate to="/alunos" replace />} />
            <Route path="rotina" element={<RestrictedRouteGuard><Rotina /></RestrictedRouteGuard>} />
            <Route path="avisos" element={<RestrictedRouteGuard><Avisos /></RestrictedRouteGuard>} />
            <Route path="historico" element={<RestrictedRouteGuard><Historico /></RestrictedRouteGuard>} />
            <Route path="logs" element={<RestrictedRouteGuard><Logs /></RestrictedRouteGuard>} />
            <Route path="perfil" element={<Perfil />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
