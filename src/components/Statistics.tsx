import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { TrendingUp, Eye, Search, Users } from "lucide-react";

interface StatItem {
  name: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface StatisticsProps {
  totalVisitors: number;
  totalSearches: number;
  mostSearchedProducts: StatItem[];
  mostViewedCategories: StatItem[];
}

export function Statistics({
  totalVisitors,
  totalSearches,
  mostSearchedProducts,
  mostViewedCategories
}: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-medium">{totalVisitors.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Visitantes hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Search className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-medium">{totalSearches.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Búsquedas realizadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most Searched Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Productos más buscados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mostSearchedProducts.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-3">
                <Badge variant="outline" className="text-xs min-w-6 justify-center">
                  {index + 1}
                </Badge>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{item.count}</span>
                      <TrendingUp className={`w-3 h-3 ${
                        item.trend === 'up' ? 'text-green-500' : 
                        item.trend === 'down' ? 'text-red-500 rotate-180' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Most Viewed Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Categorías más vistas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mostViewedCategories.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-3">
                <Badge variant="outline" className="text-xs min-w-6 justify-center">
                  {index + 1}
                </Badge>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{item.count}</span>
                      <TrendingUp className={`w-3 h-3 ${
                        item.trend === 'up' ? 'text-green-500' : 
                        item.trend === 'down' ? 'text-red-500 rotate-180' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}