import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../general-components/Button';
import { Card, CardContent } from '../../general-components/Card';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // TODO: Implementar lógica de registro
    console.log('Register:', formData);
    navigate('/login');
  };

  return (
    <Card>
      <CardContent className="p-8">
        <h1 className="text-2xl font-bold text-center text-ui-primary mb-6">
          Crear Cuenta
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full py-2.5">
            Registrarse
          </Button>
        </form>

        <p className="mt-6 text-center text-text-secondary">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-ui-primary hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}