import { Link } from 'react-router-dom';
import { Button } from '../../general-components/Button';
import { Card, CardContent } from '../../general-components/Card';

interface ErrorPageProps {
  code?: number;
  title?: string;
  message?: string;
}

export default function ErrorPage({ 
  code = 404, 
  title = 'Página no encontrada',
  message = 'Lo sentimos, la página que buscas no existe o ha sido movida.'
}: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-ui-secondary">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="text-8xl font-bold text-status-error mb-4">
            {code}
          </div>
          
          <h1 className="text-2xl font-bold text-ui-primary mb-2">
            {title}
          </h1>
          
          <p className="text-text-secondary mb-8">
            {message}
          </p>

          <div className="space-x-4">
            <Link to="/">
              <Button>Volver al inicio</Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()}>
              Ir atrás
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}