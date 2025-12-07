import { useState } from 'react';
import { Button } from '../../general-components/Button';
import { Card, CardContent } from '../../general-components/Card';
import { MessageBox } from '../../general-components/MessageBox';
import { authService } from '../../services/auth_service';

interface CreateUserModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const initialFormData = {
  name: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
};

export default function RegisterForm({ isOpen, onClose }: CreateUserModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState({ text: '', type: '' as 'error' | 'success', show: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showMessage = (text: string, type: 'error' | 'success') => {
    setMessage({ text, type, show: true });
    setTimeout(() => setMessage(prev => ({ ...prev, show: false })), 3000);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showMessage('Las contraseñas no coinciden', 'error');
      return;
    }

    try {
      await authService.registerUser(formData);
      showMessage('Usuario registrado correctamente', 'success');
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      const err = error as Error;
      showMessage(err.message || 'Error al registrar usuario', 'error');
    }
  };

  return (
    <>
		<div className="fixed inset-0 bg-black/50 flex items-center p-8 justify-center z-50">
      <div className="fixed top-4 right-4 z-50">
        <MessageBox type={message.type || 'error'} message={message.text} show={message.show} />
      </div>
      <Card className='w-full'>
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold text-center text-ui-primary mb-6">
            Crear Cuenta
          </h1>
        
          <form onSubmit={handleSubmit} className="space-y-4">

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
							<label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1">
								Usuario
							</label>
							<input
								type="text"
								id="username"
								name="username"
								value={formData.username}
								onChange={handleChange}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
								placeholder="usuario42"
								required
							/>
						</div>

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
								placeholder="nombre"
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
							Crear Usuario
						</Button>
						<Button type="button" variant='outline' onClick={handleCancel} className="w-full py-2.5">
							Cancelar
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
    </>
  );
}