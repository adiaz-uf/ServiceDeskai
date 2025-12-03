import MainLayout from "../../layouts/MainLayout";
import { CardContent } from "../../general-components/Card";
import { Select } from "../../general-components/Select";
import { CollapsibleCard } from "../../general-components/CollapsibleCard";

const filterOptions = [
  { value: "all", label: "Todas las oficinas"},
  { value: "madrid1", label: "n.1 - Madrid, Calle Cristóbal Bordiú 13"},
  { value: "madrid2", label: "n.2 - Madrid, Plaza Ruiz Picasso 11 Piso 7"},
  { value: "barcelona1", label: "n.3 - Barcelona, Carrer d’Amigó 11"},
  { value: "valencia1", label: "n.4 - Logroño, Calle Fausto Elhuyar 5-7"},
  { value: "valencia2", label: "n.5 - Málaga, Calle Compositor Lehmberg Ruiz 21 Planta 2"},
  { value: "valencia3", label: "n.6 - Málaga, Paseo del Muelle Uno"},
];

export default function ViewReportsPage() {
  return (
    <div>
        <MainLayout>
          <h1 className="text-ui-primary font font-semibold text-3xl">ServiceDeskAI</h1>
            <div className="flex justify-between mt-8 items-center gap-4">
              <h2 className="text-ui-primary font font-semibold text-2xl whitespace-nowrap">Mis Reportes</h2>
              <Select 
                options={filterOptions} 
                placeholder="Todas las oficinas"
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