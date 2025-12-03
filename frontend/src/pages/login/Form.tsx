
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../general-components/Button';
import { Card, CardContent } from '../../general-components/Card';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de autenticación
    console.log('Login:', { email, password });
    navigate('/profile');
  };

  return (
    <Card>
      <CardContent className="p-8">
        <h1 className="text-2xl font-bold text-center text-ui-primary mb-6">
          Iniciar Sesión
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
              placeholder="tu@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full py-2.5">
            Iniciar Sesión
          </Button>
        </form>

        <p className="mt-6 text-center text-text-secondary">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-ui-primary hover:underline font-medium">
            Regístrate
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}