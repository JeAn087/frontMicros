import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Edit, Trash2, MapPin, Package, Search } from "lucide-react";
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from './ProductCard';
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

interface Farm {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  productsCount: number;
}

interface ProducerDashboardProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'views' | 'rating'>) => void;
  onUpdateProduct: (productId: string, updatedData: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
}

export function ProducerDashboard({ 
  products, 
  onAddProduct, 
  onUpdateProduct,
  onDeleteProduct
}: ProducerDashboardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddFarmForm, setShowAddFarmForm] = useState(false);
  
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  
  // Estados para edición
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});

  const [farms, setFarms] = useState<Farm[]>([
    {
      id: '1',
      name: 'Finca El Paraíso',
      location: 'Norte',
      description: 'Especializada en cultivos orgánicos y café de altura',
      image: 'https://images.unsplash.com/photo-1569028895735-5faedf99f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhcm0lMjBwcm9kdWN0cyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      productsCount: 12
    },
    {
      id: '2',
      name: 'Huerta Los Andes',
      location: 'Sur',
      description: 'Verduras frescas y productos lácteos artesanales',
      image: 'https://images.unsplash.com/photo-1725208961314-a437674fe5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0cyUyMGZhcm0lMjBtYXJrZXR8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      productsCount: 8
    }
  ]);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    farmName: '',
    location: '',
    inSeason: false
  });

  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    description: '',
    image: ''
  });

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'Todos' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  const handleAddProduct = () => {
    setShowAddForm(true);
  };

  const handleAddFarm = () => {
    setShowAddFarmForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.category && newProduct.price) {
      onAddProduct(newProduct);
      toast.success('Producto agregado exitosamente');
      setNewProduct({
        name: '',
        description: '',
        category: '',
        price: '',
        image: '',
        farmName: '',
        location: '',
        inSeason: false
      });
      setShowAddForm(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setEditingProduct({ ...product });
    setShowAddForm(false);
    // Scroll al formulario para mejor UX
    setTimeout(() => {
      const formElement = document.getElementById('product-form');
      formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProductId && editingProduct.name && editingProduct.category) {
      onUpdateProduct(editingProductId, editingProduct);
      toast.success('Producto actualizado exitosamente');
      setEditingProductId(null);
      setEditingProduct({});
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditingProduct({});
  };

  const handleDeleteProduct = (productId: string) => {
    onDeleteProduct(productId);
    toast.success('Producto eliminado exitosamente');
  };

  const handleFarmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFarm.name && newFarm.location) {
      const farm: Farm = {
        ...newFarm,
        id: Date.now().toString(),
        productsCount: 0,
        image: newFarm.image || 'https://images.unsplash.com/photo-1569028895735-5faedf99f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGZhcm0lMjBwcm9kdWN0cyUyMHZlZ2V0YWJsZXN8ZW58MXx8fHwxNzU5MDcxNjc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      };
      setFarms(prev => [...prev, farm]);
      setNewFarm({
        name: '',
        location: '',
        description: '',
        image: ''
      });
      setShowAddFarmForm(false);
    }
  };

  const categories = ['Todos', 'Frutas', 'Verduras', 'Lácteos', 'Café', 'Granos', 'Carnes', 'Artesanías'];
  const locations = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste', 'Oriente', 'Occidente'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-20">
      <div className="mb-8">
        <div>
          <h2 className="text-2xl font-medium mb-2">Panel de Productor</h2>
          <p className="text-muted-foreground">Gestiona tus productos y fincas</p>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Mis Productos</span>
          </TabsTrigger>
          <TabsTrigger value="farms" className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Mis Fincas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Filtros de búsqueda */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">
                Productos ({filteredProducts.length})
              </h3>
            </div>
            <Button onClick={handleAddProduct}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Producto
            </Button>
          </div>

          {/* Formulario de agregar/editar */}
          {(showAddForm || editingProductId) && (
            <Card id="product-form">
              <CardHeader>
                <CardTitle>{editingProductId ? 'Editar Producto' : 'Nuevo Producto'}</CardTitle>
              </CardHeader>
              <form onSubmit={editingProductId ? handleSaveEdit : handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Nombre del producto"
                      value={editingProductId ? editingProduct.name || '' : newProduct.name}
                      onChange={(e) => editingProductId 
                        ? setEditingProduct({ ...editingProduct, name: e.target.value })
                        : setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <Input
                      placeholder="Precio (ej: $15.000/kg)"
                      value={editingProductId ? editingProduct.price || '' : newProduct.price}
                      onChange={(e) => editingProductId
                        ? setEditingProduct({ ...editingProduct, price: e.target.value })
                        : setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Descripción del producto"
                    value={editingProductId ? editingProduct.description || '' : newProduct.description}
                    onChange={(e) => editingProductId
                      ? setEditingProduct({ ...editingProduct, description: e.target.value })
                      : setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select 
                      value={editingProductId ? editingProduct.category || '' : newProduct.category} 
                      onValueChange={(value) => editingProductId
                        ? setEditingProduct({ ...editingProduct, category: value })
                        : setNewProduct(prev => ({ ...prev, category: value }))}
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
                      value={editingProductId ? editingProduct.farmName || '' : newProduct.farmName}
                      onChange={(e) => editingProductId
                        ? setEditingProduct({ ...editingProduct, farmName: e.target.value })
                        : setNewProduct(prev => ({ ...prev, farmName: e.target.value }))}
                    />
                    
                    <Select 
                      value={editingProductId ? editingProduct.location || '' : newProduct.location} 
                      onValueChange={(value) => editingProductId
                        ? setEditingProduct({ ...editingProduct, location: value })
                        : setNewProduct(prev => ({ ...prev, location: value }))}
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
                    value={editingProductId ? editingProduct.image || '' : newProduct.image}
                    onChange={(e) => editingProductId
                      ? setEditingProduct({ ...editingProduct, image: e.target.value })
                      : setNewProduct(prev => ({ ...prev, image: e.target.value }))}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="inSeason"
                        checked={editingProductId ? editingProduct.inSeason || false : newProduct.inSeason}
                        onCheckedChange={(checked) => editingProductId
                          ? setEditingProduct({ ...editingProduct, inSeason: checked })
                          : setNewProduct(prev => ({ ...prev, inSeason: checked }))}
                      />
                      <Label htmlFor="inSeason">En temporada</Label>
                    </div>
                    {editingProductId && (
                      <>
                        <div>
                          <Label htmlFor="rating">Calificación (0-5)</Label>
                          <Input
                            id="rating"
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
                          <Label htmlFor="views">Vistas</Label>
                          <Input
                            id="views"
                            type="number"
                            min="0"
                            placeholder="0"
                            value={editingProduct.views !== undefined ? editingProduct.views : ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, views: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button type="submit">{editingProductId ? 'Guardar Cambios' : 'Guardar Producto'}</Button>
                  <Button type="button" variant="outline" onClick={editingProductId ? handleCancelEdit : () => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>No hay productos que coincidan con los filtros</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
              <Card key={product.id}>
                <div className="relative">
                  <ImageWithFallback 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {product.inSeason && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      En temporada
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{product.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{product.price}</span>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{product.farmName}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="farms" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Mis Fincas ({farms.length})</h3>
            </div>
            <Button onClick={handleAddFarm}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Finca
            </Button>
          </div>

          {showAddFarmForm && (
            <Card>
              <CardHeader>
                <CardTitle>Nueva Finca</CardTitle>
              </CardHeader>
              <form onSubmit={handleFarmSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Nombre de la finca"
                      value={newFarm.name}
                      onChange={(e) => setNewFarm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <Select 
                      value={newFarm.location} 
                      onValueChange={(value) => setNewFarm(prev => ({ ...prev, location: value }))}
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
                  
                  <Textarea
                    placeholder="Descripción de la finca"
                    value={newFarm.description}
                    onChange={(e) => setNewFarm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                  
                  <Input
                    placeholder="URL de imagen (opcional)"
                    value={newFarm.image}
                    onChange={(e) => setNewFarm(prev => ({ ...prev, image: e.target.value }))}
                  />
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button type="submit">Guardar Finca</Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddFarmForm(false)}>
                    Cancelar
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {farms.map((farm) => (
              <Card key={farm.id}>
                <ImageWithFallback 
                  src={farm.image} 
                  alt={farm.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{farm.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{farm.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{farm.location}</span>
                    </div>
                    <Badge variant="outline">{farm.productsCount} productos</Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <Toaster position="top-right" />
    </div>
  );
}
