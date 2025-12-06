import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Button } from './general-components/Button';
import { Card, CardContent } from './general-components/Card';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ProfilePage from './pages/profile';
import ErrorPage from './pages/error/Error';
import UploadPage from './pages/uploadReport';
import ViewReportsPage from './pages/viewReport'
import ProtectedRoute from './general-components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from './store/authSlice';
import { authService } from './services/auth_service';

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


function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await authService.logoutUser();
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        dispatch(logout());
        navigate('/login');
      }
    };
    
    performLogout();
  }, [dispatch, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/reports/view" element={<ViewReportsPage />} />
          <Route path="/reports/create" element={<UploadPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </Router>
  );
}

export default App;
