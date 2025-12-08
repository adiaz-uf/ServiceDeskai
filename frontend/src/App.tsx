import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import ErrorPage from './pages/error/Error';
import UploadPage from './pages/uploadReport';
import ViewReportsPage from './pages/viewReport'
import ProtectedRoute from './general-components/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from './store/authSlice';
import { authService } from './services/auth_service';


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

        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

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
