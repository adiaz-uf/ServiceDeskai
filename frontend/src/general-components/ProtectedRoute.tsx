import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

const ProtectedRoute = () => {
    // Get Redux state
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    
    if (!isAuthenticated) {
        // Redirect to login
        return <Navigate to="/login" replace />;
    }

    return <Outlet />; 
};

export default ProtectedRoute;