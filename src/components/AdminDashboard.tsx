import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Shield, Users, MapPin, Plus, Edit, Trash2, Crown, Building2, Package, Search } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import type { Product } from "./ProductCard";
import { Switch } from "./ui/switch";

export interface Producer {
  id: string;
  name: string;
  email: string;
  role: 'comprador' | 'producer' | 'administrador';
  farmName?: string;
  location?: string;
}

export interface SalesZone {
  id: string;
  name: string;
  description: string;
  location: string;
  producers: string[];
  createdAt: string;
}

interface AdminDashboardProps {
  producers: Producer[];
  salesZones: SalesZone[];
  products: Product[];
  onUpdateProducerRole: (producerId: string, newRole: 'comprador' | 'producer' | 'administrador') => void;
  onCreateSalesZone: (zone: Omit<SalesZone, 'id' | 'createdAt' | 'producers'>) => void;
  onUpdateSalesZone: (zoneId: string, updatedData: Partial<SalesZone>) => void;
  onDeleteSalesZone: (zoneId: string) => void;
  onUpdateProduct: (productId: string, updatedData: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
}

const mockProducers: Producer[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@productoslocales.com',
    role: 'producer',
    farmName: 'Finca El Paraíso',
    location: 'Norte'
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria@productoslocales.com',
    role: 'producer',
    farmName: 'Huerta Los Andes',
    location: 'Sur'
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos@productoslocales.com',
    role: 'producer',
    farmName: 'Cooperativa Este',
    location: 'Este'
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana@productoslocales.com',
    role: 'comprador'
  },
  {
    id: '5',
    name: 'Pedro López',
    email: 'pedro@productoslocales.com',
    role: 'comprador'
  }
];

const mockSalesZones: SalesZone[] = [
  {
    id: '1',
    name: 'Zona Centro Norte',
    description: 'Zona estratégica para productores del centro y norte de la región',
    location: 'Centro-Norte',
    producers: ['1'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Zona Sur Este',
    description: 'Agrupa productores del sur y este para mejor distribución',
    location: 'Sur-Este',
    producers: ['2', '3'],
    createdAt: '2024-01-20'
  }
];

export function AdminDashboard({
  producers = mockProducers,
  salesZones = mockSalesZones,
  products = [],
  onUpdateProducerRole,
  onCreateSalesZone,
  onUpdateSalesZone,
  onDeleteSalesZone,
  onUpdateProduct,
  onDeleteProduct
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('producers');
  const [showCreateZoneForm, setShowCreateZoneForm] = useState(false);
  const [editingZoneId, setEditingZoneId] = useState<string | null>(null);
  
  // Estados para edición de productos
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  
  const [newZone, setNewZone] = useState({
    name: '',
    description: '',
    location: ''
  });

  const [editingZone, setEditingZone] = useState<Partial<SalesZone>>({});

  const handleCreateZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (newZone.name && newZone.location) {
      onCreateSalesZone(newZone);
      toast.success('Zona de ventas creada exitosamente');
      setNewZone({ name: '', description: '', location: '' });
      setShowCreateZoneForm(false);
    }
  };

  const handleEditZone = (zone: SalesZone) => {
    setEditingZoneId(zone.id);
    setEditingZone({ ...zone });
  };

  const handleSaveZoneEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingZoneId && editingZone.name && editingZone.location) {
      onUpdateSalesZone(editingZoneId, editingZone);
      toast.success('Zona de ventas actualizada exitosamente');
      setEditingZoneId(null);
      setEditingZone({});
    }
  };

  const handleCancelEdit = () => {
    setEditingZoneId(null);
    setEditingZone({});
  };

  const handleDeleteZone = (zoneId: string) => {
    onDeleteSalesZone(zoneId);
    toast.success('Zona de ventas eliminada exitosamente');
  };

  const handleRoleChange = (producerId: string, newRole: 'comprador' | 'producer' | 'administrador') => {
    onUpdateProducerRole(producerId, newRole);
    toast.success('Rol actualizado exitosamente');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'producer':
        return 'bg-green-500';
      case 'administrador':
        return 'bg-purple-500';
      case 'comprador':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'producer':
        return 'Productor';
      case 'administrador':
        return 'Administrador';
      case 'comprador':
        return 'Comprador';
      default:
        return role;
    }
  };

  // Funciones para edición de productos
  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setEditingProduct({ ...product });
    setTimeout(() => {
      const formElement = document.getElementById('admin-product-form');
      formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProductId && editingProduct.name && editingProduct.category) {
      onUpdateProduct(editingProductId, editingProduct);
      toast.success('Producto actualizado exitosamente');
      setEditingProductId(null);
      setEditingProduct({});
    }
  };

  const handleCancelProductEdit = () => {
    setEditingProductId(null);
    setEditingProduct({});
  };

  const handleDeleteProductClick = (productId: string) => {
    onDeleteProduct(productId);
    toast.success('Producto eliminado exitosamente');
  };

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todos' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Todos', 'Frutas', 'Verduras', 'Lácteos', 'Café', 'Granos', 'Carnes', 'Artesanías'];
  const locations = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste', 'Oriente', 'Occidente', 'Centro-Norte', 'Sur-Este', 'Norte-Este'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-20">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Panel de Administrador
            </h2>
            <p className="text-muted-foreground">Gestiona usuarios, productos y zonas de ventas</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="producers" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Gestión de Usuarios</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Gestión de Productos</span>
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center space-x-2">
            <Building2 className="w-4 h-4" />
            <span>Zonas de Ventas</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab de Gestión de Usuarios - HE02-HU01 */}
        <TabsContent value="producers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Usuarios del Sistema ({producers.length})
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cambia los roles de los usuarios según su relevancia y permisos
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {producers.map((producer) => (
                  <Card key={producer.id} className="border-2 hover:border-purple-300 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{producer.name}</h3>
                            <p className="text-sm text-muted-foreground">{producer.email}</p>
                            {producer.farmName && (
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{producer.farmName} - {producer.location}</span>
                              </div>
                            )}
                          </div>
                          <Badge className={`${getRoleBadgeColor(producer.role)} text-white`}>
                            {getRoleLabel(producer.role)}
                          </Badge>
                        </div>
                        <div className="ml-4">
                          <Select
                            value={producer.role}
                            onValueChange={(value: 'comprador' | 'producer' | 'administrador') => 
                              handleRoleChange(producer.id, value)
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="comprador">Comprador</SelectItem>
                              <SelectItem value="producer">Productor</SelectItem>
                              <SelectItem value="administrador">Administrador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Gestión de Productos */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-600" />
                    Gestión de Productos ({filteredProducts.length})
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Edita y gestiona todos los productos del sistema
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Buscar productos por nombre o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
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
              </div>

              {/* Formulario de edición */}
              {editingProductId && (
                <Card id="admin-product-form" className="mb-6 border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle>Editar Producto</CardTitle>
                  </CardHeader>
                  <form onSubmit={handleSaveProductEdit}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Nombre del producto"
                          value={editingProduct.name || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          required
                        />
                        <Input
                          placeholder="Precio (ej: $15.000/kg)"
                          value={editingProduct.price || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          required
                        />
                      </div>
                      
                      <Textarea
                        placeholder="Descripción del producto"
                        value={editingProduct.description || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        rows={3}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select 
                          value={editingProduct.category || ''} 
                          onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.filter(c => c !== 'Todos').map(category => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Input
                          placeholder="Nombre de la finca"
                          value={editingProduct.farmName || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, farmName: e.target.value })}
                        />
                        
                        <Select 
                          value={editingProduct.location || ''} 
                          onValueChange={(value) => setEditingProduct({ ...editingProduct, location: value })}
                        >
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
                      </div>
                      
                      <Input
                        placeholder="URL de imagen (opcional)"
                        value={editingProduct.image || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="admin-inSeason"
                            checked={editingProduct.inSeason || false}
                            onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, inSeason: checked })}
                          />
                          <Label htmlFor="admin-inSeason">En temporada</Label>
                        </div>
                        <div>
                          <Label htmlFor="admin-rating">Calificación (0-5)</Label>
                          <Input
                            id="admin-rating"
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            placeholder="4.5"
                            value={editingProduct.rating !== undefined ? editingProduct.rating : ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, rating: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="admin-views">Vistas</Label>
                          <Input
                            id="admin-views"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={editingProduct.views !== undefined ? editingProduct.views : ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, views: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex space-x-2">
                      <Button type="submit">Guardar Cambios</Button>
                      <Button type="button" variant="outline" onClick={handleCancelProductEdit}>
                        Cancelar
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}

              {/* Lista de productos */}
              <div className="space-y-4">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>No hay productos que coincidan con los filtros</p>
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <Badge variant="secondary">{product.category}</Badge>
                                <span className="text-sm text-gray-500">{product.price}</span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{product.farmName}</span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{product.location}</span>
                                {product.inSeason && (
                                  <Badge className="bg-green-500 text-white">En temporada</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Editar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteProductClick(product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Eliminar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Zonas de Ventas - HE02-HU03 */}
        <TabsContent value="zones" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="w-6 h-6 text-purple-600" />
                Zonas de Ventas ({salesZones.length})
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Crea zonas para que productores cercanos puedan ofrecer sus servicios
              </p>
            </div>
            <Button onClick={() => setShowCreateZoneForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Zona
            </Button>
          </div>

          {/* Formulario de crear/editar zona */}
          {(showCreateZoneForm || editingZoneId) && (
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle>{editingZoneId ? 'Editar Zona' : 'Nueva Zona de Ventas'}</CardTitle>
              </CardHeader>
              <form onSubmit={editingZoneId ? handleSaveZoneEdit : handleCreateZone}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="zone-name">Nombre de la zona *</Label>
                    <Input
                      id="zone-name"
                      placeholder="Ej: Zona Centro Norte"
                      value={editingZoneId ? editingZone.name || '' : newZone.name}
                      onChange={(e) => editingZoneId
                        ? setEditingZone({ ...editingZone, name: e.target.value })
                        : setNewZone({ ...newZone, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="zone-location">Ubicación *</Label>
                    <Select
                      value={editingZoneId ? editingZone.location || '' : newZone.location}
                      onValueChange={(value) => editingZoneId
                        ? setEditingZone({ ...editingZone, location: value })
                        : setNewZone({ ...newZone, location: value })}
                      required
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecciona ubicación" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="zone-description">Descripción</Label>
                    <Textarea
                      id="zone-description"
                      placeholder="Describe la zona y qué productores pueden unirse..."
                      value={editingZoneId ? editingZone.description || '' : newZone.description}
                      onChange={(e) => editingZoneId
                        ? setEditingZone({ ...editingZone, description: e.target.value })
                        : setNewZone({ ...newZone, description: e.target.value })}
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button type="submit">
                    {editingZoneId ? 'Guardar Cambios' : 'Crear Zona'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={editingZoneId ? handleCancelEdit : () => setShowCreateZoneForm(false)}
                  >
                    Cancelar
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {/* Lista de zonas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {salesZones.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Building2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>No hay zonas de ventas creadas</p>
              </div>
            ) : (
              salesZones.map((zone) => (
                <Card key={zone.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-purple-600" />
                          {zone.name}
                        </CardTitle>
                        <div className="flex items-center mt-2">
                          <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                          <span className="text-sm text-muted-foreground">{zone.location}</span>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {zone.producers.length} {zone.producers.length === 1 ? 'productor' : 'productores'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{zone.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>Creada: {zone.createdAt}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditZone(zone)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteZone(zone.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Eliminar
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Toaster position="top-right" />
    </div>
  );
}

