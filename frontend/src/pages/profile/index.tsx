import { Link } from 'react-router-dom';
import { Button } from '../../general-components/Button';
import { Card, CardContent } from '../../general-components/Card';
import MainLayout from '../../layouts/MainLayout';

function ProfilePage() {
  // TODO: Obtener datos del usuario desde el estado global o API
  const user = {
    name: 'Usuario Demo',
    email: 'demo@example.com',
    createdAt: new Date().toLocaleDateString()
  };

  const handleLogout = () => {
    // TODO: Implementar lógica de logout
    console.log('Logout');
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center bg-ui-secondary">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-ui-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-ui-primary">
                {user.name}
              </h1>
              <p className="text-text-secondary">{user.email}</p>
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Miembro desde</span>
                <span className="text-text-primary font-medium">{user.createdAt}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col space-y-3">
              <Button variant="outline" className="w-full py-2.5">
                Editar Perfil
              </Button>
              <Link to="/login">
                <Button 
                  variant="default" 
                  className="w-full py-2.5 bg-status-error hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-center">
              <Link to="/reports/view" className="text-ui-primary hover:underline font-medium">
                ← Volver al inicio
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
