import { useState, useMemo } from 'react';
import './App.css';
import { Header } from './components/Header';
import { ProductCard, type Product } from './components/ProductCard';
import { SearchFilters } from './components/SearchFilters';
import { Statistics } from './components/Statistics';
import { ProducerDashboard } from './components/ProducerDashboard';
import { RegionalMap } from './components/RegionalMap';
import { Login, type User } from './components/Login';
import { Orders, type CartItem } from './components/Orders';
import { AdminDashboard, type Producer, type SalesZone } from './components/AdminDashboard';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tomates Cherry Orgánicos',
    description: 'Tomates cherry cultivados de forma orgánica, perfectos para ensaladas y aperitivos.',
    category: 'Verduras',
    price: '$8.000/kg',
    image: 'https://images.unsplash.com/photo-1569028895735-5faedf99f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhcm0lMjBwcm9kdWN0cyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Finca El Paraíso',
    location: 'Norte',
    rating: 4.8,
    views: 156,
    inSeason: true
  },
  {
    id: '2',
    name: 'Mango Criollo',
    description: 'Mangos criollos de excelente sabor, cultivados naturalmente en nuestra región.',
    category: 'Frutas',
    price: '$5.000/kg',
    image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGZhcm0lMjBtYXJrZXR8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Huerta Los Andes',
    location: 'Sur',
    rating: 4.6,
    views: 203,
    inSeason: true
  },
  {
    id: '3',
    name: 'Café Especial de Altura',
    description: 'Café arábigo cultivado a 1.800 metros de altura, tostado artesanalmente.',
    category: 'Café',
    price: '$45.000/kg',
    image: 'https://images.unsplash.com/photo-1707734801620-55d09054aa9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZWdpb25hbCUyMGNvZmZlZSUyMGJlYW5zfGVufDF8fHx8MTc1OTA3MTY3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Finca El Paraíso',
    location: 'Norte',
    rating: 4.9,
    views: 389,
    inSeason: false
  },
  {
    id: '4',
    name: 'Queso Campesino',
    description: 'Queso fresco elaborado tradicionalmente con leche de vacas criadas en pastoreo.',
    category: 'Lácteos',
    price: '$18.000/kg',
    image: 'https://images.unsplash.com/photo-1758369908837-38166bca7e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsb2NhbCUyMGRhaXJ5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzU5MDcxNjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Huerta Los Andes',
    location: 'Sur',
    rating: 4.7,
    views: 124,
    inSeason: true
  },
  {
    id: '5',
    name: 'Leche Fresca de Vaca',
    description: 'Leche fresca de vacas Holstein criadas en pastoreo libre.',
    category: 'Lácteos',
    price: '$3.500/litro',
    image: 'https://images.unsplash.com/photo-1758369908837-38166bca7e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsb2NhbCUyMGRhaXJ5JTIwcHJvZHVjdHN8ZW58MXx8fHwxNzU5MDcxNjc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Cooperativa Este',
    location: 'Este',
    rating: 4.5,
    views: 98,
    inSeason: true
  },
  {
    id: '6',
    name: 'Quinua Orgánica',
    description: 'Quinua cultivada orgánicamente, rica en proteínas y libre de químicos.',
    category: 'Granos',
    price: '$12.000/kg',
    image: 'https://images.unsplash.com/photo-1569028895735-5faedf99f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhcm0lMjBwcm9kdWN0cyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Mercado Oeste',
    location: 'Oeste',
    rating: 4.8,
    views: 76,
    inSeason: true
  },
  {
    id: '7',
    name: 'Miel de Abeja Pura',
    description: 'Miel artesanal extraída de colmenas ubicadas en zonas florales naturales.',
    category: 'Artesanías',
    price: '$25.000/500g',
    image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGZhcm0lMjBtYXJrZXR8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Cooperativa Este',
    location: 'Este',
    rating: 4.9,
    views: 145,
    inSeason: true
  },
  {
    id: '8',
    name: 'Frijoles Rojos',
    description: 'Frijoles rojos de excelente calidad, ideales para preparaciones tradicionales.',
    category: 'Granos',
    price: '$6.500/kg',
    image: 'https://images.unsplash.com/photo-1569028895735-5faedf99f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhcm0lMjBwcm9kdWN0cyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Mercado Oeste',
    location: 'Oeste',
    rating: 4.4,
    views: 67,
    inSeason: false
  },
  {
    id: '9',
    name: 'Papa Criolla',
    description: 'Papa criolla fresca, cultivada en las montañas del Oriente.',
    category: 'Verduras',
    price: '$4.500/kg',
    image: 'https://images.unsplash.com/photo-1569028895735-5faedf99f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhcm0lMjBwcm9kdWN0cyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Finca Oriente',
    location: 'Oriente',
    rating: 4.7,
    views: 112,
    inSeason: true
  },
  {
    id: '10',
    name: 'Aguardiente Artesanal',
    description: 'Aguardiente destilado tradicionalmente en la región del Occidente.',
    category: 'Artesanías',
    price: '$35.000/botella',
    image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGZhcm0lMjBtYXJrZXR8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    farmName: 'Destilería Occidente',
    location: 'Occidente',
    rating: 4.8,
    views: 89,
    inSeason: true
  }
];

const mockStatistics = {
  totalVisitors: 2847,
  totalSearches: 1456,
  mostSearchedProducts: [
    { name: 'Café', count: 234, percentage: 85, trend: 'up' as const },
    { name: 'Tomates', count: 189, percentage: 68, trend: 'up' as const },
    { name: 'Mango', count: 156, percentage: 56, trend: 'stable' as const },
    { name: 'Queso', count: 98, percentage: 35, trend: 'down' as const },
    { name: 'Aguacate', count: 76, percentage: 27, trend: 'up' as const }
  ],
  mostViewedCategories: [
    { name: 'Frutas', count: 1247, percentage: 90, trend: 'up' as const },
    { name: 'Café', count: 967, percentage: 70, trend: 'up' as const },
    { name: 'Verduras', count: 834, percentage: 60, trend: 'stable' as const },
    { name: 'Lácteos', count: 542, percentage: 39, trend: 'down' as const },
    { name: 'Granos', count: 287, percentage: 21, trend: 'up' as const }
  ]
};

export default function App() {
  const [activeView, setActiveView] = useState<'comprador' | 'producer' | 'administrador' | 'orders' | 'login'>('login');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLocation, setSelectedLocation] = useState('Todas las ubicaciones');
  const [inSeasonOnly, setInSeasonOnly] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [allUsers, setAllUsers] = useState<Producer[]>([]);
  const [salesZones, setSalesZones] = useState<SalesZone[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesLocation = selectedLocation === 'Todas las ubicaciones' || product.location === selectedLocation;
      const matchesSeason = !inSeasonOnly || product.inSeason;
      
      return matchesSearch && matchesCategory && matchesLocation && matchesSeason;
    });
  }, [products, searchTerm, selectedCategory, selectedLocation, inSeasonOnly]);

  const handleProductView = (productId: string) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, views: product.views + 1 }
        : product
    ));
  };

  const handleAddProduct = (newProductData: Omit<Product, 'id' | 'views' | 'rating'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now().toString(),
      views: 0,
      rating: 0,
      image: newProductData.image || 'https://images.unsplash.com/photo-1569028895735-5faedf99f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhcm0lMjBwcm9kdWN0cyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (productId: string, updatedData: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, ...updatedData }
        : product
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todos');
    setSelectedLocation('Todas las ubicaciones');
    setInSeasonOnly(false);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setActiveView(userData.role);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setActiveView('login');
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateProducerRole = (producerId: string, newRole: 'comprador' | 'producer' | 'administrador') => {
    setAllUsers(prev => prev.map(user =>
      user.id === producerId
        ? { ...user, role: newRole }
        : user
    ));
    // También actualizar el usuario actual si es necesario
    if (user && allUsers.find(u => u.id === user.email)) {
      setUser({ ...user, role: newRole });
    }
  };

  const handleCreateSalesZone = (zone: Omit<SalesZone, 'id' | 'createdAt' | 'producers'>) => {
    const newZone: SalesZone = {
      ...zone,
      id: Date.now().toString(),
      producers: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSalesZones(prev => [...prev, newZone]);
  };

  const handleUpdateSalesZone = (zoneId: string, updatedData: Partial<SalesZone>) => {
    setSalesZones(prev => prev.map(zone =>
      zone.id === zoneId
        ? { ...zone, ...updatedData }
        : zone
    ));
  };

  const handleDeleteSalesZone = (zoneId: string) => {
    setSalesZones(prev => prev.filter(zone => zone.id !== zoneId));
  };

  if (activeView === 'login' || !user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header activeView={activeView} onViewChange={setActiveView} onLogout={handleLogout} />
      
      {activeView === 'orders' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-20">
          <Orders
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
          />
        </main>
      ) : activeView === 'administrador' ? (
        <AdminDashboard
          producers={allUsers}
          salesZones={salesZones}
          products={products}
          onUpdateProducerRole={handleUpdateProducerRole}
          onCreateSalesZone={handleCreateSalesZone}
          onUpdateSalesZone={handleUpdateSalesZone}
          onDeleteSalesZone={handleDeleteSalesZone}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      ) : activeView === 'comprador' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-20">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Productos Regionales
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 font-medium">
              Descubre los mejores productos locales de nuestra región
            </p>
            
            <SearchFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
              inSeasonOnly={inSeasonOnly}
              onSeasonToggle={() => setInSeasonOnly(!inSeasonOnly)}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Productos disponibles <span className="text-green-600">({filteredProducts.length})</span>
            </h3>
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-600 text-lg font-medium mb-4">
                  No se encontraron productos que coincidan con los filtros seleccionados.
                </p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onView={handleProductView}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Estadísticas de búsqueda</h3>
              <Statistics {...mockStatistics} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Mapa de la región</h3>
              <RegionalMap 
                products={filteredProducts}
                onLocationFilter={setSelectedLocation}
                selectedLocation={selectedLocation}
              />
            </div>
          </div>
        </main>
      ) : (
        <ProducerDashboard 
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </div>
  );
}