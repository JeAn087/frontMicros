import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, CheckCircle, Truck } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import type { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface OrdersProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

export function Orders({ 
  products, 
  cart, 
  onAddToCart, 
  onRemoveFromCart, 
  onUpdateQuantity, 
  onClearCart 
}: OrdersProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'cash' as 'cash' | 'card' | 'transfer',
    deliveryZone: 'Centro'
  });

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    if (!deliveryInfo.name || !deliveryInfo.address || !deliveryInfo.phone) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Simular procesamiento de pedido
    toast.success('¡Pedido realizado exitosamente!', {
      description: `Total: $${total.toLocaleString()}. Recibirás una confirmación pronto.`,
    });
    
    setIsCheckoutOpen(false);
    onClearCart();
    setDeliveryInfo({ name: '', address: '', phone: '', paymentMethod: 'cash', deliveryZone: 'Centro' });
  };

  const deliveryZones = ['Centro', 'Norte', 'Sur', 'Este', 'Oeste', 'Oriente', 'Occidente'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Módulo de Pedidos
          </h2>
          <p className="text-gray-600 mt-2">Gestiona tus compras de productos locales</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2 bg-green-50 border-green-200 text-green-700">
          <ShoppingCart className="w-5 h-5 mr-2" />
          {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Productos */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-green-600" />
                Productos Disponibles
              </CardTitle>
              <CardDescription>Selecciona los productos que deseas pedir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {products.map((product) => {
                  const cartItem = cart.find(item => item.product.id === product.id);
                  const isInCart = !!cartItem;

                  return (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-all bg-white hover:shadow-md"
                    >
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate">{product.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                            <span className="text-green-600 font-bold">{product.price}</span>
                          </div>
                        </div>
                      </div>

                      {isInCart ? (
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(product.id, cartItem.quantity - 1)}
                            className="w-9 h-9 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{cartItem.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(product.id, cartItem.quantity + 1)}
                            className="w-9 h-9 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveFromCart(product.id)}
                            className="w-9 h-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => onAddToCart(product)}
                          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Agregar
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Carrito de Compras */}
        <div className="space-y-4">
          <Card className="sticky top-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <ShoppingCart className="w-6 h-6" />
                Carrito de Compras
              </CardTitle>
              <CardDescription>
                {cart.length === 0 ? 'Tu carrito está vacío' : `${cart.length} productos agregados`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p>No hay productos en el carrito</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {cart.map((item) => {
                      const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ''));
                      const subtotal = price * item.quantity;
                      
                      return (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm truncate">{item.product.name}</p>
                            <p className="text-xs text-gray-600">
                              {item.quantity} × ${price.toLocaleString()}
                            </p>
                          </div>
                          <span className="font-bold text-green-600">
                            ${subtotal.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t-2 border-green-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-700">Total:</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        ${total.toLocaleString()}
                      </span>
                    </div>

                    {cart.length > 0 && (
                      <>
                        <Button
                          onClick={() => setIsCheckoutOpen(true)}
                          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl"
                        >
                          <CreditCard className="w-5 h-5 mr-2" />
                          Proceder al Checkout
                        </Button>
                        <Button
                          onClick={onClearCart}
                          variant="outline"
                          className="w-full border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Vaciar Carrito
                        </Button>
                      </>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Información de Entrega
              </CardTitle>
              <CardDescription className="text-white/90">
                Completa tus datos para procesar el pedido
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Juan Pérez"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="300 000 0000"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                      required
                      className="border-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección de entrega *</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Calle 123 #45-67"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                    required
                    className="border-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Zona veredal de entrega *</Label>
                    <Select
                      value={deliveryInfo.deliveryZone}
                      onValueChange={(value) => setDeliveryInfo({ ...deliveryInfo, deliveryZone: value })}
                    >
                      <SelectTrigger className="border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryZones.map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Método de pago *</Label>
                    <Select
                      value={deliveryInfo.paymentMethod}
                      onValueChange={(value: 'cash' | 'card' | 'transfer') => 
                        setDeliveryInfo({ ...deliveryInfo, paymentMethod: value })
                      }
                    >
                      <SelectTrigger className="border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">💵 Efectivo</SelectItem>
                        <SelectItem value="card">💳 Tarjeta</SelectItem>
                        <SelectItem value="transfer">🏦 Transferencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Total a pagar:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <CardFooter className="pt-4 gap-3 px-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg"
                  >
                    <Truck className="w-5 h-5 mr-2" />
                    Confirmar Pedido
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

