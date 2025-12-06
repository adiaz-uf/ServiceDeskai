import { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";

import { Button } from "../../general-components/Button";
import MainLayout from "../../layouts/MainLayout";
import { Card, CardContent } from "../../general-components/Card";
import { MessageBox } from "../../general-components/MessageBox";
import InsertEmailModal from "./insertEmailModal";
import InsertLocationModal from "./insertLocationModal";

export default function UploadPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState<string | null>(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState({ text: '', type: '' as 'error' | 'success' | 'app', show: false });

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

  const handleSend = () => {
    if (!selectedOfficeId) {
      showMessage('Debes seleccionar una oficina', 'app');
      return;
    }
    
    const reportData = {
      description,
      officeId: selectedOfficeId,
      shareEmail
    };
    console.log('Datos del reporte:', reportData);
    showMessage('Reporte enviado correctamente', 'success');
    setShareEmail(null);
    setSelectedOfficeId(null);
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

                {/* Buttons with icons for camera and upload */}
                <Button variant="outline" className="text-2xl !py-2">
                  <IoCameraOutline />
                </Button>
                <Button className="text-2xl !py-2 !px-3">
                  <FiUpload />
                </Button>
              </div>
            </div>

            {/* Placeholder for image content */}
            <Card className="mt-5">
              <CardContent>
              <div className="w-full text-ui-primary aspect-square bg-ui-secondary rounded-md flex text-5xl items-center justify-center">
                <IoCameraOutline />
              </div>
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
                    <Button className="text-xl !py-2 !px-3 ml-auto flex items-center gap-2" onClick={handleSend}>
                      Send <LuSend />
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