import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { LogIn, UserPlus, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

export interface User {
  email: string;
  name: string;
  role: 'comprador' | 'producer' | 'administrador';
  isAuthenticated: boolean;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<'comprador' | 'producer' | 'administrador'>('comprador');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Autenticación simulada
    const user: User = {
      email: loginEmail,
      name: loginEmail.split('@')[0],
      role: registerRole,
      isAuthenticated: true
    };

    onLogin(user);
    toast.success(`¡Bienvenido, ${user.name}!`);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPassword) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const user: User = {
      email: registerEmail,
      name: registerName,
      role: registerRole,
      isAuthenticated: true
    };

    onLogin(user);
    toast.success(`¡Cuenta creada exitosamente, ${user.name}!`);
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 border-gray-200">
        <CardHeader className="text-center space-y-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <MapPin className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">ProductosLocales</CardTitle>
          <CardDescription className="text-white/90 text-base">
            Accede a productos de tu región
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Correo electrónico</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-11 border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-11 border-2"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Iniciar Sesión
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nombre completo</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="h-11 border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Correo electrónico</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="h-11 border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Contraseña</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="h-11 border-2"
                  />
                  <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
                </div>
                <div className="space-y-2">
                  <Label>Selecciona tu rol</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      type="button"
                      variant={registerRole === 'comprador' ? 'default' : 'outline'}
                      onClick={() => setRegisterRole('comprador')}
                      className={`h-11 transition-all duration-300 text-xs ${
                        registerRole === 'comprador' 
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                          : 'border-2 hover:bg-blue-50'
                      }`}
                    >
                      👤 Comprador
                    </Button>
                    <Button
                      type="button"
                      variant={registerRole === 'producer' ? 'default' : 'outline'}
                      onClick={() => setRegisterRole('producer')}
                      className={`h-11 transition-all duration-300 text-xs ${
                        registerRole === 'producer' 
                          ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                          : 'border-2 hover:bg-green-50'
                      }`}
                    >
                      🌾 Productor
                    </Button>
                    <Button
                      type="button"
                      variant={registerRole === 'administrador' ? 'default' : 'outline'}
                      onClick={() => setRegisterRole('administrador')}
                      className={`h-11 transition-all duration-300 text-xs ${
                        registerRole === 'administrador' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                          : 'border-2 hover:bg-purple-50'
                      }`}
                    >
                      👑 Admin
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Crear Cuenta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 text-center text-sm text-gray-600 bg-gray-50 rounded-b-lg pt-4">
          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
            🔒 Tus datos están protegidos
          </Badge>
        </CardFooter>
      </Card>
      <Toaster position="top-right" />
    </div>
  );
}
