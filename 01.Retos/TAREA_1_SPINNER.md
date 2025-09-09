# Reto - Componente Spinner y Carousel Diferido

## Historia de Usuario

**Como** administrador del sistema  
**Quiero** implementar un componente spinner reutilizable y un carousel con carga diferida  
**Para** mejorar la experiencia de usuario mostrando estados de carga consistentes

## Criterios de Aceptación

### 1. Componente Spinner
- [ ] Crear un componente spinner en `components/shared/spinner`
- [ ] Debe incluir estilos de animación usando Tailwind CSS
- [ ] Debe aceptar propiedades opcionales color

### 2. Implementación en Carousel
- [ ] Integrar el spinner en el bloque `@loading` del carousel
- [ ] El carousel debe cargarse de forma diferida usando `@defer (on viewport)`
- [ ] El spinner debe mostrarse mientras el carousel se está cargando
- [ ] El carousel debe aparecer solo cuando entre en la vista del usuario

### 3. Estados de Carga
- [ ] Mostrar placeholder antes de que el carousel entre en viewport
- [ ] Mostrar spinner durante la carga del carousel
- [ ] Transición suave entre estados

## Tareas Técnicas

- [ ] **Crear componente:** `ng g c components/shared/spinner`
- [ ] **Implementar animación:** usar clases de Tailwind para rotación
- [ ] **Configurar propiedades:** size, color como inputs opcionales
- [ ] **Integrar en carousel:** usar en bloque `@defer` con trigger `viewport`
- [ ] **Aplicar estilos:** componente responsive y accesible

## Estructura de Archivos

```
src/app/
├── components/
│   └── shared/
│       └── spinner/
│           ├── spinner.component.ts
│           └── spinner.component.html
└── pages/
    └── home/
        └── home.component.html (implementación del carousel diferido)
```

## Especificaciones del Spinner

### Propiedades del Componente
```typescript
@Input() color: string = 'blue-600';
```

## Ejemplo de Implementación Esperada

```html
@defer (on viewport) {
  <carousel-component />
} @loading {
  <app-spinner size="lg" color="blue-600" />
} @placeholder {
  <div class="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
    <p class="text-gray-500">Carousel por cargar</p>
  </div>
}
```

## Objetivos de Aprendizaje

- Crear componentes standalone reutilizables
- Implementar carga diferida con trigger viewport
- Aplicar animaciones CSS con Tailwind
- Gestionar estados de carga en componentes
- Usar bloques @defer, @loading y @placeholder

## Tiempo Estimado

**15 minutos máximo**

## Entregables

1. Componente spinner funcional y reutilizable
2. Integración del spinner en el carousel diferido
3. Implementación correcta del trigger viewport
4. Estados de carga manejados apropiadamente
5. Código limpio y bien