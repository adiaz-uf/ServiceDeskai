import { useState, useEffect } from "react";

import { Card, CardContent } from "../../general-components/Card";
import { Button } from "../../general-components/Button";
import { Select } from "../../general-components/Select";
import { officeService, Office } from "../../services/office_service";

interface InsertLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (officeId: string) => void;
}

export default function InsertLocationModal({ isOpen, onClose, onSubmit }: InsertLocationModalProps) {
    const [selectedOfficeId, setSelectedOfficeId] = useState("");
    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
			if (isOpen) {
				const fetchOffices = async () => {
					try {
						const data = await officeService.getAllOffices();
						setOffices(data);
					} catch (error) {
						console.error('Error fetching offices:', error);
					} finally {
						setLoading(false);
					}
				};
				fetchOffices();
			}
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault();
			if (!selectedOfficeId) return;
			onSubmit(selectedOfficeId);
			onClose();
    };

    const handleCancel = () => {
			onSubmit("");
			onClose();
    };

    const officeOptions = offices.map((office) => ({
			value: office._id,
			label: `n.${office.number} - ${office.city}, ${office.direction}`
    }));

    return (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
				<Card className="w-full max-w-md">
					<CardContent className="p-6">
						<div className="flex justify-between items-center mb-4">
							<span className="text-ui-primary font-semibold text-lg">
								Seleccionar Oficina
							</span>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<Select
									options={officeOptions}
									value={selectedOfficeId}
									onChange={(value) => setSelectedOfficeId(value)}
									placeholder={loading ? "Cargando oficinas..." : "Selecciona una oficina"}
								/>
							</div>
							<div className="flex gap-6">
								<Button type="button" className="w-full" variant='outline' onClick={handleCancel}>
									Cancelar
								</Button>
								<Button type="submit" className="w-full" disabled={!selectedOfficeId}>
									Confirmar
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
    );
}
