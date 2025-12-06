import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { CardContent } from "../../general-components/Card";
import { Select } from "../../general-components/Select";
import { CollapsibleCard } from "../../general-components/CollapsibleCard";
import { officeService, Office } from "../../services/office_service";
import { reportService } from "../../services/report_service";
import { ReportCard, Report } from "./ReportCard";

export default function ViewReportsPage() {
  const [filterOptions, setFilterOptions] = useState<{ value: string; label: string }[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const offices = await officeService.getAllOffices();
        const options = [
          { value: "all", label: "Todas las oficinas" },
          ...offices.map((office: Office) => ({
            value: office._id,
            label: `n.${office.number} - ${office.city}, ${office.direction}`
          }))
        ];
        setFilterOptions(options);
      } catch (error) {
        console.error('Error fetching offices:', error);
        setFilterOptions([{ value: "all", label: "Todas las oficinas" }]);
      }
    };

    const fetchReports = async () => {
      try {
        const response = await reportService.getReportHistory();
        setReports(response.reports || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
    fetchReports();
  }, []);

  // Filter reports by office
  const filteredReports = selectedOffice === "all" 
    ? reports 
    : reports.filter(r => r.office?._id === selectedOffice);

  // Separate opened & closed reports
  const pendingReports = filteredReports.filter(r => r.status !== 'closed');
  const closedReports = filteredReports.filter(r => r.status === 'closed');

  // Handle status update from modal
  const handleStatusUpdate = (reportId: string, newStatus: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report._id === reportId 
          ? { ...report, status: newStatus as Report['status'] }
          : report
      )
    );
  };

  return (
    <div>
        <MainLayout>
          <h1 className="text-ui-primary font font-semibold text-3xl">ServiceDeskAI</h1>
            <div className="flex justify-between mt-8 items-center gap-4">
              <h2 className="text-ui-primary font font-semibold text-2xl whitespace-nowrap">Mis Reportes</h2>
              <Select 
                options={filterOptions} 
                placeholder={loading ? "Cargando..." : "Todas las oficinas"}
                onChange={(value) => setSelectedOffice(value)}
              />
            </div>

            {loading ? (
              <div className="mt-5 text-center text-gray-500">Cargando reportes...</div>
            ) : (
              <>
                {/* Pending reports */}
                <CollapsibleCard title={`Pendientes de resolución (${pendingReports.length})`} defaultOpen={true} className="mt-5">
                  {pendingReports.length === 0 ? (
                    <CardContent>
                      <p className="text-gray-500 text-center py-4">No hay reportes pendientes</p>
                    </CardContent>
                  ) : (
                    pendingReports.map((report) => (
                      <ReportCard 
                        key={report._id} 
                        report={report} 
                        onStatusUpdate={handleStatusUpdate}
                      />
                    ))
                  )}
                </CollapsibleCard>

                {/* Closed reports */}
                <CollapsibleCard title={`Cerrados (${closedReports.length})`} className="mt-5">
                  {closedReports.length === 0 ? (
                    <CardContent>
                      <p className="text-gray-500 text-center py-4">No hay reportes cerrados</p>
                    </CardContent>
                  ) : (
                    closedReports.map((report) => (
                      <ReportCard 
                        key={report._id} 
                        report={report} 
                        onStatusUpdate={handleStatusUpdate}
                      />
                    ))
                  )}
                </CollapsibleCard>
              </>
            )}
        </MainLayout>
    </div>
  );
}