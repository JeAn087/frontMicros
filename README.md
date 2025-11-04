# ProductosLocales - Sistema de Gestión de Productos Regionales

Sistema completo para la gestión y comercialización de productos locales de la región, con autenticación de usuarios, módulo de pedidos y administración de productos.

## 🚀 Características

### ✅ Sistema de Autenticación
- **Login** y **Registro** de usuarios
- **Tres roles disponibles:** Comprador, Productor y Administrador
- Protección de rutas basada en autenticación
- Interfaz intuitiva con validaciones

### 🛒 Módulo de Pedidos
- Catálogo de productos disponibles
- Carrito de compras interactivo
- Checkout con información de entrega
- Selección de zona veredal (Centro, Norte, Sur, Este, Oeste, Oriente, Occidente)
- Métodos de pago: Efectivo, Tarjeta, Transferencia
- Cálculo automático de totales

### 📦 Gestión de Productos
- **Vista de visitante** con filtros avanzados:
  - Búsqueda por nombre
  - Filtro por categoría
  - Filtro por ubicación/zona veredal
  - Filtro de productos en temporada
- **Vista de productor** para administrar productos:
  - ✅ Agregar nuevos productos (HU01)
  - ✅ Listar todos los productos agregados (HU02)
  - ✅ Actualizar/editar productos existentes (HU03)
  - ✅ Filtrar productos por categoría (HU04)
  - ✅ Filtrar productos por patrón de búsqueda (HU05)
  - ✅ Eliminar/deshabilitar productos (HU06)
- Dashboard con estadísticas en tiempo real
- Mapa regional interactivo

### 🗺️ Zonas Veredales
- Centro
- Norte
- Sur
- Este
- Oeste
- **Oriente** (nuevo)
- **Occidente** (nuevo)

## 🛠️ Tecnologías Utilizadas

- **React 19** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **Radix UI** para componentes accesibles
- **Sonner** para notificaciones
- **React Hook Form** para formularios
- **Lucide React** para iconos

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la versión de producción
npm run preview
```

## 🎯 Uso

### Iniciar Sesión o Registrarse
1. Al iniciar la aplicación, verás la pantalla de login
2. Puedes iniciar sesión con cualquier email/password (autenticación simulada)
3. O crear una nueva cuenta seleccionando tu rol (Comprador, Productor o Administrador)

### Como Comprador
1. Explorar productos con filtros
2. Ver estadísticas y mapa regional
3. Acceder al módulo de Pedidos para hacer compras

### Como Productor
1. **Gestión Completa de Productos:**
   - Ver todos tus productos en un listado
   - Agregar nuevos productos con formulario completo
   - Editar productos existentes haciendo clic en "Editar"
   - Eliminar productos haciendo clic en "Eliminar"
   - Filtrar por categoría y buscar por nombre/descripción
2. Ver estadísticas de tus productos
3. Actualizar a cuenta Premium para más funciones
4. Gestión de fincas

### Como Administrador
1. **Gestión de Usuarios (HE02-HU01):**
   - Ver todos los usuarios del sistema
   - Cambiar roles de usuarios (Comprador, Productor, Administrador)
   - Asignar permisos según relevancia de cada usuario
   - Actualización de permisos en tiempo real
2. **Gestión de Zonas de Ventas (HE02-HU03):**
   - Crear nuevas zonas de ventas
   - Editar y eliminar zonas existentes
   - Configurar ubicaciones para productores cercanos
   - Ver productores asociados a cada zona

### Módulo de Pedidos
1. Navegar a la sección "Pedidos" en el header
2. Agregar productos al carrito
3. Ajustar cantidades o remover productos
4. Completar información de entrega
5. Seleccionar zona veredal y método de pago
6. Confirmar pedido

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Login.tsx          # Sistema de autenticación
│   ├── Orders.tsx         # Módulo de pedidos
│   ├── AdminDashboard.tsx # Panel de administrador
│   ├── Header.tsx         # Navegación principal
│   ├── ProductCard.tsx    # Tarjeta de producto
│   ├── SearchFilters.tsx  # Filtros de búsqueda
│   ├── Statistics.tsx     # Estadísticas
│   ├── ProducerDashboard.tsx
│   ├── RegionalMap.tsx
│   └── ui/               # Componentes UI de Radix
├── App.tsx               # Componente principal
└── main.tsx              # Punto de entrada
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
