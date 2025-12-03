import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from './general-components/Button';
import { Card, CardContent } from './general-components/Card';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Profile from './pages/Profile';
import ErrorPage from './pages/error/Error';

function Home() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-white">
      <Card>
        <CardContent className="p-8 text-center">
          <h1 className="text-2xl font-bold text-ui-primary mb-6">
            Bienvenido a ServiceDesk AI
          </h1>
            
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link to="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
