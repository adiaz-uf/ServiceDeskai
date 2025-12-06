import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../general-components/Button";
import { CardContent } from "../../general-components/Card";
import { RootState } from '../../store/store';
import { ReportDetailsModal } from "./ReportDetailsModal";

export interface Report {
  _id: string;
  description?: string;
  office: {
    _id: string;
    number: number;
    city: string;
    direction: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
		username: string;
  };
  status: 'open' | 'assigned' | 'in-progress' | 'closed';
  image_url: string;
  sharedWith?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReportCardProps {
  report: Report;
  onStatusUpdate?: (reportId: string, newStatus: string) => void;
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'open': 'Abierto',
    'assigned': 'Asignado',
    'in-progress': 'En progreso',
    'closed': 'Cerrado'
  };
  return labels[status] || status;
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'open': 'bg-blue-100 border border-blue-800 text-blue-800',
    'assigned': 'bg-yellow-100 border border-yellow-800 text-yellow-800',
    'in-progress': 'bg-green-100 border border-green-800 text-green-800',
    'closed': 'bg-red-100 border border-red-800 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const ReportCard = ({ report, onStatusUpdate }: ReportCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleStatusUpdate = (reportId: string, newStatus: string) => {
    if (onStatusUpdate) {
      onStatusUpdate(reportId, newStatus);
    }
  };

  return (
    <>
      <CardContent className="p-0 py-4 border-b border-ui-primary rounded-t-lg last:border-b-0">
        <div className="flex gap-3">
          <div 
            className="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_BACKEND_PORT}/uploads/${report.image_url})` 
            }}
          />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-lg text-sm font-medium text-center ${getStatusColor(report.status)}`}>
                {getStatusLabel(report.status)}
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(report.createdAt)}
              </span>
            </div>
            <p className="text-md text-gray-700 truncate">
              {report.description || 'Sin descripción'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {report.office?.city} - {report.office?.direction}
            </p>
            {user?.userRole !== 'user' && (
              <Button 
                className="ml-auto mt-auto"
                onClick={() => setIsModalOpen(true)}
              >
                Ver detalles
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <ReportDetailsModal
        report={report}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      />
    </>
  );
};