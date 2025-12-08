
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from '../../general-components/Button';
import { Card, CardContent } from '../../general-components/Card';
import { authService } from '../../services/auth_service';
import { MessageBox } from '../../general-components/MessageBox';
import { loginSuccess } from '../../store/authSlice';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' as 'error' | 'success', show: false });

  const dispatch = useDispatch();

  const showMessage = (text: string, type: 'error' | 'success') => {
    setMessage({ text, type, show: true });
    setTimeout(() => setMessage(prev => ({ ...prev, show: false })), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loggeduser = await authService.loginUser({email, password});
      
      // Save user data in store & localStorage
      dispatch(loginSuccess({
        accessToken: loggeduser.user.accesstoken,
        user: {
          _id: loggeduser.user._id,
          email: loggeduser.user.email,
          username: loggeduser.user.username,
          name: loggeduser.user.name,
          userRole: loggeduser.user.userRole
        }
      }));

      navigate('/reports/view');
      
    } catch (error) {
      const err = error as Error;
      showMessage(err.message || 'Error al iniciar sesion', 'error');
    }
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <MessageBox type={message.type || 'error'} message={message.text} show={message.show} />
      </div>
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
        </CardContent>
      </Card>
    </>
  );
}