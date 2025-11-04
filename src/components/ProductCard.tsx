import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, Star, Eye } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  farmName: string;
  location: string;
  rating: number;
  views: number;
  inSeason: boolean;
}

interface ProductCardProps {
  product: Product;
  onView: (productId: string) => void;
}

export function ProductCard({ product, onView }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-200 bg-white group">
      <div className="relative overflow-hidden">
        <ImageWithFallback 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.inSeason && (
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg animate-pulse-glow">
            🌿 En temporada
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5 bg-gradient-to-b from-white to-gray-50">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors line-clamp-1">{product.name}</h3>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent whitespace-nowrap ml-2">{product.price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1.5 text-green-600" />
          <span className="font-medium">{product.farmName}</span>
          <span className="mx-2">•</span>
          <span className="text-blue-600">{product.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
            </div>
            <div className="flex items-center text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
              <Eye className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{product.views}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0 font-medium">
            {product.category}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 bg-gradient-to-b from-gray-50 to-white">
        <Button 
          onClick={() => onView(product.id)}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          variant="default"
        >
          Ver detalles
        </Button>
      </CardFooter>
    </Card>
  );
}