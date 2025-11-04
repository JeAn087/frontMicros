import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, User, BarChart3, ShoppingCart, LogOut, Shield } from "lucide-react";

interface HeaderProps {
  activeView: 'comprador' | 'producer' | 'administrador' | 'orders';
  onViewChange: (view: 'comprador' | 'producer' | 'administrador' | 'orders') => void;
  onLogout?: () => void;
}

export function Header({ activeView, onViewChange, onLogout }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo y título */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-green-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">ProductosLocales</h1>
              <p className="text-xs md:text-sm text-gray-600 font-medium">Descubre lo mejor de la región</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">ProductosLocales</h1>
            </div>
          </div>

      {/* Sección de badges y botones */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Badge variant="outline" className="text-sm flex items-center gap-1.5 bg-green-50 border-green-200 text-green-700 font-medium shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <BarChart3 className="w-4 h-4" />
          En vivo
        </Badge>

            <div className="flex items-center gap-2">
              <div className="flex flex-wrap gap-1 bg-gradient-to-r from-gray-100 to-gray-50 p-1 rounded-xl shadow-inner border border-gray-200">
              <Button 
                  variant={activeView === 'comprador' ? 'default' : 'ghost'}
                size="sm"
                  onClick={() => onViewChange('comprador')}
                  className={`text-xs flex items-center gap-1 px-2 md:px-3 transition-all duration-300 ${
                    activeView === 'comprador' 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'hover:bg-white/80 text-gray-700'
                }`}
              >
                <User className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Comprador</span>
                </Button>
                <Button 
                  variant={activeView === 'orders' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewChange('orders')}
                  className={`text-xs flex items-center gap-1 px-2 md:px-3 transition-all duration-300 ${
                    activeView === 'orders' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'hover:bg-white/80 text-gray-700'
                  }`}
                >
                  <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Pedidos</span>
              </Button>
              <Button 
                variant={activeView === 'producer' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewChange('producer')}
                  className={`text-xs flex items-center gap-1 px-2 md:px-3 transition-all duration-300 ${
                  activeView === 'producer' 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                    : 'hover:bg-white/80 text-gray-700'
                }`}
              >
                <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Productor</span>
                </Button>
                <Button 
                  variant={activeView === 'administrador' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onViewChange('administrador')}
                  className={`text-xs flex items-center gap-1 px-2 md:px-3 transition-all duration-300 ${
                    activeView === 'administrador' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'hover:bg-white/80 text-gray-700'
                  }`}
                >
                  <Shield className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </div>
              {onLogout && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Salir</span>
              </Button>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}