import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { CardContent } from "../../general-components/Card";
import { Select } from "../../general-components/Select";
import { CollapsibleCard } from "../../general-components/CollapsibleCard";
import { officeService, Office } from "../../services/office_service";

export default function ViewReportsPage() {
  const [filterOptions, setFilterOptions] = useState<{ value: string; label: string }[]>([]);
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
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  return (
    <div>
        <MainLayout>
          <h1 className="text-ui-primary font font-semibold text-3xl">ServiceDeskAI</h1>
            <div className="flex justify-between mt-8 items-center gap-4">
              <h2 className="text-ui-primary font font-semibold text-2xl whitespace-nowrap">Mis Reportes</h2>
              <Select 
                options={filterOptions} 
                placeholder={loading ? "Cargando..." : "Todas las oficinas"}
                onChange={(value) => console.log(value)}
              />
            </div>

            {/* Placeholder for image content */}
            <CollapsibleCard title="Pendientes de resolución" defaultOpen={true} className="mt-5">
              <CardContent>
                Reporte pendiente 1
              </CardContent>
              <CardContent>
                Reporte pendiente 2
              </CardContent>
              <CardContent>
                Reporte pendiente 3
              </CardContent>
              <CardContent>
                Reporte pendiente 4
              </CardContent>
            </CollapsibleCard>
            <CollapsibleCard title="Cerrados" className="mt-5">
              <CardContent>
                Reporte cerrado 1
              </CardContent>
              <CardContent>
                Reporte cerrado 2
              </CardContent>
              <CardContent>
                Reporte cerrado 3
              </CardContent>
              <CardContent>
                Reporte cerrado 4
              </CardContent>
            </CollapsibleCard>

        </MainLayout>
    </div>
  );
}