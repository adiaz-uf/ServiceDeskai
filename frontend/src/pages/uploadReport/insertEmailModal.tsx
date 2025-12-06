import { useState } from "react";

import { Card, CardContent } from "../../general-components/Card";
import { Button } from "../../general-components/Button";

interface InsertEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
}

export default function InsertEmailModal({ isOpen, onClose, onSubmit }: InsertEmailModalProps) {
    const [email, setEmail] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email.trim());
        onClose();
    };

    const handleCancel = () => {
        setEmail("");
        onSubmit("");
        onClose();
    };

    return (
			<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
				<Card className="w-full max-w-md">
					<CardContent className="p-6">
						<div className="flex justify-between items-center mb-4">
							<span className="text-ui-primary font-semibold text-lg">
								Enviar reporte por Email
							</span>
						</div>
						<form onSubmit={handleSubmit}>
							<input 
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="correo@ejemplo.com"
								className="w-full p-3 border border-ui-primary rounded-md bg-ui-background mb-4"
							/>
							<div className="flex gap-6">
								<Button type="button" className="w-full" variant='outline' onClick={handleCancel}>
									Cancelar
								</Button>
								<Button type="submit" className="w-full">
									Enviar
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
    );
}