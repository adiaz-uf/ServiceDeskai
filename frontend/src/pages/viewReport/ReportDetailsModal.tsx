import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../../general-components/Button";
import { Select } from "../../general-components/Select";
import { reportService } from "../../services/report_service";
import { Report } from "./ReportCard";

interface ReportDetailsModalProps {
  report: Report;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (reportId: string, newStatus: string) => void;
}

const statusOptions = [
  { value: 'open', label: 'Abierto' },
  { value: 'assigned', label: 'Asignado' },
  { value: 'in-progress', label: 'En progreso' },
  { value: 'closed', label: 'Cerrado' }
];

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
    'open': 'bg-blue-100 text-blue-800',
    'assigned': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-green-100 text-green-800',
    'closed': 'bg-red-100 text-red-800'
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

export const ReportDetailsModal = ({ report, isOpen, onClose, onStatusUpdate }: ReportDetailsModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState(report.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStatusChange = async () => {
    if (selectedStatus === report.status) return;
    
    setIsUpdating(true);
    setError(null);
    
    try {
      await reportService.updateReportStatus(report._id, selectedStatus);
      onStatusUpdate(report._id, selectedStatus);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el estado');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="min-h-full flex items-center justify-center p-4">
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg my-8">
          {/* Header */}
          <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b rounded-t-lg z-10">
            <h2 className="text-xl font-semibold text-ui-primary">Detalles del Reporte</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose className="text-2xl text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
          {/* Image */}
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-200 mb-4">
            <img 
              src={`${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_BACKEND_PORT}/uploads/${report.image_url}`}
              alt="Reporte"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-gray-600">Estado actual:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
              {getStatusLabel(report.status)}
            </span>
          </div>
					
					{/* Status Update Section */}
          <div className="border-t pt-4 mb-4">
            <h3 className="text-md font-semibold text-ui-primary mb-3">Cambiar Estado</h3>
            
            {error && (
              <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <div className="flex-1">
                <Select
                  options={statusOptions}
                  placeholder={getStatusLabel(report.status)}
                  onChange={(value) => setSelectedStatus(value as Report['status'])}
                />
              </div>
              <Button 
                onClick={handleStatusChange}
                disabled={isUpdating || selectedStatus === report.status}
                className="whitespace-nowrap"
              >
                {isUpdating ? 'Actualizando...' : 'Actualizar'}
              </Button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-3 mb-4">
						<div className="flex gap-16">
            <div>
              <span className="text-md font-medium text-ui-primary">Fecha de creación:</span>
              <p className="text-gray-800">{formatDate(report.createdAt)}</p>
            </div>
            
            <div>
              <span className="text-md font-medium text-ui-primary">Última actualización:</span>
              <p className="text-gray-800">{formatDate(report.updatedAt)}</p>
            </div>
						</div>

            <div>
              <span className="text-md font-medium text-ui-primary">Ubicación:</span>
              <p className="text-gray-800">
                n.{report.office?.number} - {report.office?.city}, {report.office?.direction}
              </p>
            </div>

            <div>
              <span className="text-md font-medium text-ui-primary">Reportado por:</span>
              <p className="text-gray-800">{report.user?.username} - ({report.user?.email})</p>
            </div>

            {report.sharedWith && (
              <div>
                <span className="text-md font-medium text-ui-primary">Compartido con:</span>
                <p className="text-gray-800">{report.sharedWith}</p>
              </div>
            )}

            <div>
              <span className="text-md font-medium text-ui-primary">Descripción:</span>
              <p className="text-gray-800 mt-1 bg-gray-50 rounded-md break-words">
                {report.description || 'Sin descripción'}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
