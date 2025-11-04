import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, Users, Eye, Package, Calendar } from "lucide-react";

const salesData = [
  { month: 'Ene', sales: 12400, views: 1240 },
  { month: 'Feb', sales: 15600, views: 1580 },
  { month: 'Mar', sales: 18900, views: 1890 },
  { month: 'Abr', sales: 22300, views: 2150 },
  { month: 'May', sales: 19800, views: 1980 },
  { month: 'Jun', sales: 25400, views: 2340 }
];

const productPerformance = [
  { name: 'Café Especial', sales: 45000, percentage: 35 },
  { name: 'Tomates Cherry', sales: 28000, percentage: 22 },
  { name: 'Queso Campesino', sales: 22000, percentage: 17 },
  { name: 'Mango Criollo', sales: 18000, percentage: 14 },
  { name: 'Otros', sales: 15000, percentage: 12 }
];

const categoryData = [
  { name: 'Café', value: 35, fill: '#f59e0b' },
  { name: 'Lácteos', value: 25, fill: '#3b82f6' },
  { name: 'Frutas', value: 20, fill: '#10b981' },
  { name: 'Verduras', value: 20, fill: '#ef4444' }
];

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'];

export function PremiumStatistics() {
  const totalRevenue = 148400;
  const monthlyGrowth = 12.5;
  const totalViews = 11580;
  const conversionRate = 3.2;

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-medium">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Ingresos totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-medium">+{monthlyGrowth}%</p>
                <p className="text-sm text-muted-foreground">Crecimiento mensual</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-medium">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Vistas totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-medium">{conversionRate}%</p>
                <p className="text-sm text-muted-foreground">Tasa de conversión</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Tendencia de Ventas e Interacciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'sales' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                  name === 'sales' ? 'Ventas' : 'Vistas'
                ]}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="sales" 
                stroke="#10b981" 
                strokeWidth={3}
                name="sales"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="views" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="views"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Rendimiento por Producto</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productPerformance.map((product) => (
                <div key={product.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{product.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        ${product.sales.toLocaleString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {product.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={product.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Distribución por Categoría</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((category, index) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Rendimiento Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={salesData.slice(-4)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ventas']} />
              <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}