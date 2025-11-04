import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Users, Package } from "lucide-react";
import type { Product } from './ProductCard';

interface MapLocation {
  id: string;
  name: string;
  zone: string;
  x: number;
  y: number;
  farmCount: number;
  productCount: number;
  description: string;
}

interface RegionalMapProps {
  products: Product[];
  onLocationFilter: (location: string) => void;
  selectedLocation: string;
}

const mapLocations: MapLocation[] = [
  {
    id: '1',
    name: 'Finca El Paraíso',
    zone: 'Norte',
    x: 45,
    y: 25,
    farmCount: 1,
    productCount: 8,
    description: 'Zona montañosa ideal para café y cultivos de altura'
  },
  {
    id: '2',
    name: 'Huerta Los Andes',
    zone: 'Sur',
    x: 35,
    y: 70,
    farmCount: 1,
    productCount: 6,
    description: 'Valle fértil perfecto para frutas y verduras'
  },
  {
    id: '3',
    name: 'Centro Comercial',
    zone: 'Centro',
    x: 50,
    y: 45,
    farmCount: 0,
    productCount: 3,
    description: 'Punto de distribución central'
  },
  {
    id: '4',
    name: 'Cooperativa Este',
    zone: 'Este',
    x: 75,
    y: 40,
    farmCount: 2,
    productCount: 5,
    description: 'Zona ganadera y lácteos artesanales'
  },
  {
    id: '5',
    name: 'Mercado Oeste',
    zone: 'Oeste',
    x: 25,
    y: 55,
    farmCount: 1,
    productCount: 4,
    description: 'Área de granos y cereales'
  }
];

const zones = [
  { name: 'Norte', color: '#22c55e', products: 2 },
  { name: 'Sur', color: '#3b82f6', products: 2 },
  { name: 'Centro', color: '#f59e0b', products: 0 },
  { name: 'Este', color: '#8b5cf6', products: 0 },
  { name: 'Oeste', color: '#ef4444', products: 0 }
];

export function RegionalMap({ products, onLocationFilter, selectedLocation }: RegionalMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const getProductCountByZone = (zone: string) => {
    return products.filter(product => product.location === zone).length;
  };

  const handleLocationClick = (location: MapLocation) => {
    setSelectedPin(location.id);
    onLocationFilter(location.zone);
  };

  const handleZoneClick = (zoneName: string) => {
    onLocationFilter(zoneName);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <span>Mapa Regional de Productos</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Explora las fincas y productos por ubicación geográfica
        </p>
      </CardHeader>
      <CardContent>
        {/* Map SVG */}
        <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 mb-6">
          <svg
            width="100%"
            height="400"
            viewBox="0 0 100 100"
            className="border rounded-lg bg-white shadow-sm"
          >
            {/* Background terrain */}
            <defs>
              <pattern id="terrain" patternUnits="userSpaceOnUse" width="10" height="10">
                <rect width="10" height="10" fill="#f0fdf4" />
                <circle cx="5" cy="5" r="1" fill="#dcfce7" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#terrain)" />
            
            {/* Mountain ranges (Norte) */}
            <path
              d="M0,30 Q25,15 50,25 Q75,35 100,20 L100,0 L0,0 Z"
              fill="#065f46"
              opacity="0.3"
            />
            
            {/* River */}
            <path
              d="M20,40 Q50,45 80,60"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            
            {/* Zone boundaries */}
            <g opacity="0.2">
              <line x1="50" y1="0" x2="50" y2="100" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
            </g>
            
            {/* Location pins */}
            {mapLocations.map((location) => {
              const isSelected = selectedPin === location.id;
              const isHovered = hoveredLocation === location.id;
              const productCount = getProductCountByZone(location.zone);
              
              return (
                <g key={location.id}>
                  {/* Pin shadow */}
                  <circle
                    cx={location.x + 1}
                    cy={location.y + 1}
                    r={isSelected || isHovered ? "3" : "2.5"}
                    fill="rgba(0,0,0,0.2)"
                  />
                  
                  {/* Pin */}
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={isSelected || isHovered ? "3" : "2.5"}
                    fill={isSelected ? "#dc2626" : productCount > 0 ? "#059669" : "#6b7280"}
                    stroke="white"
                    strokeWidth="1"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredLocation(location.id)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    onClick={() => handleLocationClick(location)}
                  />
                  
                  {/* Product count badge */}
                  {productCount > 0 && (
                    <text
                      x={location.x}
                      y={location.y - 5}
                      textAnchor="middle"
                      fontSize="3"
                      fill="#374151"
                      className="pointer-events-none"
                    >
                      {productCount}
                    </text>
                  )}
                  
                  {/* Location label */}
                  <text
                    x={location.x}
                    y={location.y + 8}
                    textAnchor="middle"
                    fontSize="2.5"
                    fill="#374151"
                    className="pointer-events-none"
                  >
                    {location.name.split(' ')[0]}
                  </text>
                  
                  {/* Hover tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={location.x - 15}
                        y={location.y - 15}
                        width="30"
                        height="10"
                        fill="rgba(0,0,0,0.8)"
                        rx="2"
                      />
                      <text
                        x={location.x}
                        y={location.y - 8}
                        textAnchor="middle"
                        fontSize="2"
                        fill="white"
                      >
                        {location.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          
          {/* Zone labels */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-green-700">
              NORTE
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-blue-700">
              SUR
            </div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-xs font-medium text-amber-700">
              OESTE
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xs font-medium text-purple-700">
              ESTE
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-orange-700">
              CENTRO
            </div>
          </div>
        </div>
        
        {/* Zone filters */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Filtrar por zona</span>
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Button
              variant={selectedLocation === 'Todas las ubicaciones' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onLocationFilter('Todas las ubicaciones')}
              className="justify-start"
            >
              <Package className="w-3 h-3 mr-2" />
              Todas ({products.length})
            </Button>
            
            {zones.map((zone) => {
              const count = getProductCountByZone(zone.name);
              return (
                <Button
                  key={zone.name}
                  variant={selectedLocation === zone.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleZoneClick(zone.name)}
                  className="justify-start"
                >
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: zone.color }}
                  />
                  {zone.name} ({count})
                </Button>
              );
            })}
          </div>
        </div>
        
        {/* Selected location info */}
        {selectedPin && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            {(() => {
              const location = mapLocations.find(loc => loc.id === selectedPin);
              if (!location) return null;
              
              return (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h5 className="font-medium">{location.name}</h5>
                    <Badge variant="secondary">{location.zone}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {location.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Package className="w-3 h-3" />
                      <span>{getProductCountByZone(location.zone)} productos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{location.farmCount} fincas</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
        
        {/* Legend */}
        <div className="mt-6 pt-4 border-t">
          <h5 className="text-sm font-medium mb-2">Leyenda</h5>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span>Con productos</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span>Sin productos</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span>Seleccionado</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}