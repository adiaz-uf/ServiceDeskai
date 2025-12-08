import { useState, useRef } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";

import { Button } from "../../general-components/Button";
import MainLayout from "../../layouts/MainLayout";
import { Card, CardContent } from "../../general-components/Card";
import { MessageBox } from "../../general-components/MessageBox";
import InsertEmailModal from "./InsertEmailModal";
import InsertLocationModal from "./InsertLocationModal";
import { reportService } from "../../services/report_service";

export default function UploadPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState<string | null>(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' as 'error' | 'success' | 'app', show: false });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showMessage = (text: string, type: 'error' | 'success' | 'app') => {
    setMessage({ text, type, show: true });
    setTimeout(() => setMessage(prev => ({ ...prev, show: false })), 4000);
  };

  const handleEmailSubmit = (email: string) => {
    setShareEmail(email || null);
  };

  const handleLocationSubmit = (officeId: string) => {
    setSelectedOfficeId(officeId || null);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        showMessage('Solo se permiten imágenes JPEG, JPG y PNG', 'error');
        return;
      }
      // (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('La imagen no puede superar 5MB', 'error');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    setDescription("");
    setSelectedImage(null);
    setImagePreview(null);
    setShareEmail(null);
    setSelectedOfficeId(null);
  };

  const handleSend = async () => {
    if (!selectedImage) {
      showMessage('Debes seleccionar una imagen', 'app');
      return;
    }
    if (!selectedOfficeId) {
      showMessage('Debes seleccionar una oficina', 'app');
      return;
    }
    if (description.length > 1000) {
      showMessage('La descripción no puede exceder 1000 caracteres', 'app');
      return;
    }

    setIsLoading(true);
    
    try {
      await reportService.createReport({
        description,
        office: selectedOfficeId,
        image: selectedImage,
        sharedWith: shareEmail || undefined
      });
      
      showMessage('Reporte enviado correctamente', 'success');
      resetForm();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el reporte';
      showMessage(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <MessageBox type={message.type || 'error'} message={message.text} show={message.show} />
      </div>
      <MainLayout>
        <h1 className="text-ui-primary font font-semibold text-3xl">ServiceDeskAI</h1>
        <div className="flex justify-between mt-8 items-center">
          <h2 className="text-ui-primary font font-semibold text-2xl">Crear Reporte</h2>
          <div className="flex gap-2">
            {/* Select file hidden input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
            />

            {/* upload image button*/}
            <Button className="text-2xl !py-2 !px-3" onClick={handleUploadClick}>
              <FiUpload />
            </Button>
          </div>
        </div>

        {/* Image preview or placeholder */}
        <Card className="mt-5  border border-ui-primary">
          <CardContent className="!p-0">
          {imagePreview ? (
            <div className="w-full aspect-square bg-ui-secondary rounded-md flex items-center justify-center overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ) : (
            <div 
              className="w-full text-ui-primary aspect-square bg-ui-secondary rounded-md flex text-5xl items-center justify-center cursor-pointer hover:bg-opacity-80 transition-all"
              onClick={handleUploadClick}
            >
              <IoCameraOutline />
            </div>
          )}
          </CardContent>
        </Card>
        
        <Card className="mt-5">
          <CardContent>
            <div className="w-full bg-ui-secondary rounded-md flex flex-col text-start justify-center">
              <p className="mb-2">Describe el problema</p>
              <textarea 
                className="w-full h-24 p-2 border border-ui-primary resize-none rounded-md bg-ui-background"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe detalladamente el problema (opcional)"
              />
              <div className="flex gap-2 mt-3">
                <Button variant='outline'
                    className={`text-xl !py-2 ${selectedOfficeId ? 'bg-blue-300' : ''}`}
                    onClick={() => setIsLocationModalOpen(true)}>
                  <FaLocationDot />
                </Button>
                <Button variant='outline'
                    className={`text-xl !py-2 !px-3 ${shareEmail ? 'bg-blue-300':''}`}
                    onClick={() => setIsEmailModalOpen(true)}>
                  <IoShareSocialOutline />
                </Button>
                <Button 
                  className="text-xl !py-2 !px-3 ml-auto flex items-center gap-2" 
                  onClick={handleSend}
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Send'} <LuSend />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <InsertEmailModal 
          isOpen={isEmailModalOpen} 
          onClose={() => setIsEmailModalOpen(false)}
          onSubmit={handleEmailSubmit}
        />

        <InsertLocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          onSubmit={handleLocationSubmit}
        />
      </MainLayout>
    </div>
  );
}