import { useState } from 'react';
import { Button } from '../../general-components/Button';
import { Card, CardContent } from '../../general-components/Card';
import { MessageBox } from '../../general-components/MessageBox';
import { officeService } from '../../services/office_service';

interface CreateOfficeModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const initialFormData = {
  city: '',
  country: '',
  direction: ''
};

export default function CreateOfficeModal({ isOpen, onClose }: CreateOfficeModalProps) {
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

    try {
      await officeService.createOffice(formData);
      showMessage('Oficina creada correctamente', 'success');
      setFormData(initialFormData);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      const err = error as Error;
      showMessage(err.message || 'Error al crear oficina', 'error');
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
              Crear Oficina
            </h1>
          
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-text-secondary mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
                  placeholder="Madrid"
                  required
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-text-secondary mb-1">
                  País
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
                  placeholder="España"
                  required
                />
              </div>

              <div>
                <label htmlFor="direction" className="block text-sm font-medium text-text-secondary mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direction"
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ui-primary focus:border-transparent"
                  placeholder="Calle Gran Vía 42, Piso 3"
                  required
                />
              </div>

              <Button type="submit" className="w-full py-2.5">
                Crear Oficina
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
