import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, Filter, X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  inSeasonOnly: boolean;
  onSeasonToggle: () => void;
  onClearFilters: () => void;
}

const categories = [
  "Todos",
  "Frutas",
  "Verduras", 
  "Lácteos",
  "Café",
  "Granos",
  "Carnes",
  "Artesanías"
];

const locations = [
  "Todas las ubicaciones",
  "Centro",
  "Norte",
  "Sur",
  "Este",
  "Oeste",
  "Oriente",
  "Occidente"
];

export function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  inSeasonOnly,
  onSeasonToggle,
  onClearFilters
}: SearchFiltersProps) {
  const hasFilters = selectedCategory !== "Todos" || 
                    selectedLocation !== "Todas las ubicaciones" || 
                    inSeasonOnly ||
                    searchTerm;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-md">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-xl text-gray-800">Filtros de búsqueda</h3>
        {hasFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-gray-600 hover:text-red-600 hover:bg-red-50 font-medium transition-all duration-300"
          >
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 border-2 border-gray-200 focus:border-green-500 rounded-lg shadow-sm focus:shadow-md transition-all duration-300 bg-white"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Ubicación" />
          </SelectTrigger>
          <SelectContent>
            {locations.map(location => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant={inSeasonOnly ? "default" : "outline"}
          onClick={onSeasonToggle}
          className={`h-12 font-semibold transition-all duration-300 ${
            inSeasonOnly 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl' 
              : 'border-2 hover:bg-green-50 hover:border-green-300'
          }`}
        >
          🌿 Solo en temporada
        </Button>
      </div>
      
      {hasFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          {searchTerm && (
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 font-medium shadow-sm">
              🔍 Búsqueda: "{searchTerm}"
            </Badge>
          )}
          {selectedCategory !== "Todos" && (
            <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700 font-medium shadow-sm">
              {selectedCategory}
            </Badge>
          )}
          {selectedLocation !== "Todas las ubicaciones" && (
            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 font-medium shadow-sm">
              📍 {selectedLocation}
            </Badge>
          )}
          {inSeasonOnly && (
            <Badge variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700 font-medium shadow-sm">
              🌿 En temporada
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}