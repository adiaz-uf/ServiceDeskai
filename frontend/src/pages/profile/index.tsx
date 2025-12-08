import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUserPlus } from "react-icons/fa6";
import { LuHousePlus } from "react-icons/lu";

import { Button } from '../../general-components/Button';
import { Card, CardContent } from '../../general-components/Card';
import MainLayout from '../../layouts/MainLayout';
import { RootState } from '../../store/store';
import CreateUserModal from './CreateUserModal';
import CreateOfficeModal from './CreateOfficeModal';

function ProfilePage() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateOffice, setShowCreateOffice] = useState(false);

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="flex flex-col gap-2 items-center mb-6">
              <div className="w-24 h-24 bg-ui-primary rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <h1 className="text-3xl text-center font-bold text-ui-primary">
                {user?.name || 'Usuario'}
              </h1>
              <p className="text-text-secondary text-lg">{user?.email}</p>
              <p className="text-text-secondary text-lg">@{user?.username}</p>
            </div>

            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex justify-around items-center">
                <span className="text-text-primary text-2xl">Rol:</span>
                <span className="text-text-secondary font-medium text-2xl">{user?.userRole}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col space-y-3">
              <Button 
                variant="default" 
                className="w-full py-2.5 bg-status-error hover:bg-red-700"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Create user button & modal (only admin) */}
      {
        user.userRole === 'admin' &&
        (
          <>
            {/* Create office button */}
            <div className="fixed bottom-48 right-4 z-40">
              <Button 
                className='text-4xl !rounded-full !p-4'
                onClick={() => setShowCreateOffice(true)}
              >
                <LuHousePlus />
              </Button>
            </div>
      
            <CreateOfficeModal
              isOpen={showCreateOffice} 
              onClose={() => setShowCreateOffice(false)}
            />

            {/* Create user button */}
            <div className="fixed bottom-28 right-4 z-40">
              <Button 
                className='text-4xl !rounded-full !p-4'
                onClick={() => setShowCreateUser(true)}
              >
                <FaUserPlus />
              </Button>
            </div>
      
            <CreateUserModal
              isOpen={showCreateUser} 
              onClose={() => setShowCreateUser(false)}
            />
          </>
        )
      }
    </MainLayout>
  );
}

export default ProfilePage;
