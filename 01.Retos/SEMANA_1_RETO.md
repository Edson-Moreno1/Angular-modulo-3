
# Reto Semana 1 - Página de Detalles del Producto

## Historia de Usuario

**Como** usuario del ecommerce  
**Quiero** ver los detalles completos de un producto específico  
**Para** tomar una decisión informada de compra

## Criterios de Aceptación

### 1. Navegación al detalle
- [x] Cuando hago clic en "Ver más" en una tarjeta de producto, debo ser redirigido a `/products/:id`
- [x] La URL debe contener el ID del producto como parámetro

### 2. Información mostrada
- [ ] Imagen principal del producto (con zoom opcional)
- [ ] Nombre completo del producto
- [ ] Descripción detallada
- [ ] Precio actual
- [ ] Stock disponible
- [ ] Categoría del producto


### 3. Funcionalidades
- [ ] Botón "Agregar al carrito" (deshabilitado si no hay stock)
- [ ] Selector de cantidad (limitado por el stock)
- [ ] Botón "Volver" o breadcrumb para regresar al listado
- [ ] Compartir producto (opcional)

### 4. Estados de carga
- [ ] Mostrar skeleton/placeholder mientras carga
- [ ] Manejar error si el producto no existe (404 ya sea rederigiendo al usuario a una pagina not found o a home )
- [ ] Redireccionar al listado si el ID es inválido

##  Tareas Técnicas

- [ ] **Crear componente:** `ng g c pages/product-detail`
- [ ] **Agregar ruta:** `/products/:id` en `app.routes.ts`
- [ ] **Crear servicio:** `getProductById(id: string)` en `ProductService`
- [ ] **Implementar navegación:** desde `product-card` component
- [ ] **Manejar parámetros de ruta:** usar `ActivatedRoute` para obtener el ID
- [ ] **Diseñar UI:** layout responsivo con Tailwind CSS

## Objetivos de Aprendizaje

- Implementar routing con parámetros en Angular
- Consumir APIs REST con HttpClient
- Manejar estados de carga y error
- Aplicar principios de UX/UI con Tailwind CSS
- Gestionar navegación entre componentes

## Estructura de Archivos

```
src/app/
├── pages/
│   └── product-detail/
│       ├── product-detail.component.ts
│       ├── product-detail.component.html
│       └── product-detail.component.css
├── core/
│   └── services/
│       └── product/
│           └── product.service.ts
└── app.routes.ts
```

##  Entregables

1. Componente funcional de detalles del producto
2. Servicio actualizado con método `getProductById()`
3. Routing configurado correctamente
4. UI responsive implementada con Tailwind CSS
5. Manejo de estados de carga y error
6. Este reto se entegara el jueves 11/09/2025
7. En la entrega se revisara rapidamente el codigo asi como la funcionalidad del mismo acompañado con una explicacion clara por parte del desarrollador de como funciona


