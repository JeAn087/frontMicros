import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Crown, TrendingUp, Eye, Zap, Star } from "lucide-react";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  limitType: 'products' | 'farms';
}

const premiumFeatures = [
  {
    icon: Zap,
    title: "Productos ilimitados",
    description: "Sube tantos productos y fincas como necesites"
  },
  {
    icon: TrendingUp,
    title: "Estadísticas avanzadas de ventas",
    description: "Analiza tendencias, ingresos y rendimiento detallado"
  },
  {
    icon: Eye,
    title: "Prioridad en búsquedas",
    description: "Tus productos aparecen primero en los resultados"
  },
  {
    icon: Star,
    title: "Badge Premium",
    description: "Destaca como productor verificado y premium"
  }
];

export function PremiumModal({ isOpen, onClose, onUpgrade, limitType }: PremiumModalProps) {
  const limitText = limitType === 'products' ? 'productos' : 'fincas';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-500" />
            <span>¡Actualiza a Premium!</span>
          </DialogTitle>
          <DialogDescription>
            Has alcanzado el límite de 5 {limitText}. Actualiza a Premium para acceder a funciones avanzadas.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current vs Premium comparison */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2">
              <CardContent className="p-4 text-center">
                <h4 className="font-medium mb-2">Plan Actual</h4>
                <Badge variant="secondary">Gratis</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Máximo 5 {limitText}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-yellow-200 bg-yellow-50">
              <CardContent className="p-4 text-center">
                <h4 className="font-medium mb-2">Plan Premium</h4>
                <Badge className="bg-yellow-500">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {limitText} ilimitados
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Premium features */}
          <div className="space-y-3">
            <h4 className="font-medium">Beneficios Premium:</h4>
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pricing */}
          <div className="bg-muted p-4 rounded-lg text-center">
            <p className="text-2xl font-medium">$29.900/mes</p>
            <p className="text-sm text-muted-foreground">Cancela cuando quieras</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Continuar gratis
            </Button>
            <Button onClick={onUpgrade} className="flex-1 bg-yellow-500 hover:bg-yellow-600">
              <Crown className="w-4 h-4 mr-2" />
              Actualizar ahora
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            * Los precios están en pesos colombianos. Facturación mensual.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}