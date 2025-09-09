# Guía de TailwindCSS v4 y Angular Material con Angular 19

**Documentacion oficial de Tailwind**: https://tailwindcss.com/docs

## TailwindCSS v4

TailwindCSS v4 introduce cambios significativos en la instalación y configuración, especialmente diseñados para trabajar mejor con frameworks modernos como Angular 19.

### Instalación TailwindCSS v4

La instalación de TailwindCSS v4 ha sido simplificada:

```bash

npm install tailwindcss @tailwindcss/postcss postcss --force
```

### Configuración

#### 1. PostCSS Configuration

Crea un archivo `.postcssrc.json` en la raíz del proyecto:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

#### 2. Configuración en styles.css

Reemplaza el contenido de `src/styles.css`:

```css
@import "tailwindcss";
```

### Principales Cambios en v4

- **Configuración Simplificada**: Menos archivos de configuración necesarios
- **Mejor Performance**: Motor CSS más rápido y eficiente
- **CSS Nativo**: Uso de características CSS nativas como `@layer`
- **Sintaxis Mejorada**: Nuevas funcionalidades y sintaxis más limpia

### Clases Fundamentales de TailwindCSS

#### Colores

TailwindCSS v4 mantiene su sistema de colores robusto con mejoras en la consistencia:

```html
<!-- Colores de texto -->
<p class="text-blue-500">Texto azul</p>
<p class="text-red-600">Texto rojo</p>
<p class="text-green-400">Texto verde</p>

<!-- Colores de fondo -->
<div class="bg-gray-100">Fondo gris claro</div>
<div class="bg-purple-600">Fondo púrpura</div>
<div class="bg-yellow-200">Fondo amarillo claro</div>

<!-- Colores de borde -->
<div class="border border-blue-300">Borde azul</div>
<div class="border-2 border-red-500">Borde rojo grueso</div>
```

**Escala de colores**: Los colores van desde 50 (más claro) hasta 950 (más oscuro).

#### Sistema Flexbox

El sistema flexbox de Tailwind permite crear layouts flexibles y responsivos:

```html
<!-- Container flex básico -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Direcciones -->
<div class="flex flex-col">Layout vertical</div>
<div class="flex flex-row">Layout horizontal</div>
<div class="flex flex-row-reverse">Horizontal invertido</div>

<!-- Justificación -->
<div class="flex justify-start">Inicio</div>
<div class="flex justify-center">Centro</div>
<div class="flex justify-end">Final</div>
<div class="flex justify-between">Espacio entre elementos</div>
<div class="flex justify-around">Espacio alrededor</div>
<div class="flex justify-evenly">Espacio uniforme</div>

<!-- Alineación -->
<div class="flex items-start">Alinear arriba</div>
<div class="flex items-center">Alinear centro</div>
<div class="flex items-end">Alinear abajo</div>
<div class="flex items-stretch">Estirar elementos</div>

<!-- Wrap -->
<div class="flex flex-wrap">Permite salto de línea</div>
<div class="flex flex-nowrap">No permite salto de línea</div>

<!-- Gap -->
<div class="flex gap-4">Gap de 1rem</div>
<div class="flex gap-x-2 gap-y-4">Gap horizontal y vertical diferente</div>
```


#### Sistema Grid

CSS Grid en Tailwind para layouts complejos:

```html
<!-- Grid básico -->
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Columnas responsivas -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Elementos del grid -->
</div>

<!-- Filas -->
<div class="grid grid-rows-3 gap-4">
  <div>Fila 1</div>
  <div>Fila 2</div>
  <div>Fila 3</div>
</div>

<!-- Span de columnas y filas -->
<div class="grid grid-cols-6 gap-4">
  <div class="col-span-2">Ocupa 2 columnas</div>
  <div class="col-span-4">Ocupa 4 columnas</div>
  <div class="col-start-2 col-end-5">Desde columna 2 hasta 5</div>
</div>

<!-- Auto-fit y auto-fill -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  <!-- Elementos que se ajustan automáticamente -->
</div>

<!-- Areas de grid (requiere CSS personalizado) -->
<div class="grid grid-cols-3 grid-rows-3">
  <div class="col-start-1 col-end-3 row-start-1">Header</div>
  <div class="col-start-1 row-start-2 row-end-4">Sidebar</div>
  <div class="col-start-2 col-end-4 row-start-2 row-end-4">Main</div>
</div>
```


#### Sistema de Posicionamiento

Control preciso de la posición de elementos:

```html
<!-- Position types -->
<div class="static">Posición estática (por defecto)</div>
<div class="relative">Posición relativa</div>
<div class="absolute">Posición absoluta</div>
<div class="fixed">Posición fija</div>
<div class="sticky">Posición sticky</div>

<!-- Posicionamiento con coordenadas -->
<div class="absolute top-0 left-0">Esquina superior izquierda</div>
<div class="absolute top-0 right-0">Esquina superior derecha</div>
<div class="absolute bottom-0 left-0">Esquina inferior izquierda</div>
<div class="absolute bottom-0 right-0">Esquina inferior derecha</div>

<!-- Centrado absoluto -->
<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  Centrado perfecto
</div>

<!-- Inset (shorthand) -->
<div class="absolute inset-0">Cubre todo el contenedor</div>
<div class="absolute inset-x-0">Extiende horizontalmente</div>
<div class="absolute inset-y-0">Extiende verticalmente</div>

<!-- Z-index -->
<div class="relative z-10">Z-index 10</div>
<div class="relative z-20">Z-index 20 (encima)</div>
<div class="relative z-0">Z-index 0</div>
<div class="relative -z-10">Z-index negativo</div>
```


#### Utilidades Avanzadas

```html
<!-- Spacing (margin y padding) -->
<div class="m-4">Margin en todas las direcciones</div>
<div class="mx-4">Margin horizontal</div>
<div class="my-4">Margin vertical</div>
<div class="mt-4 mb-8 ml-2 mr-6">Margins específicos</div>

<div class="p-4">Padding en todas las direcciones</div>
<div class="px-4">Padding horizontal</div>
<div class="py-4">Padding vertical</div>

<!-- Sizing -->
<div class="w-full">Ancho completo</div>
<div class="w-1/2">Mitad del ancho</div>
<div class="w-64">Ancho fijo (16rem)</div>
<div class="h-screen">Alto completo de pantalla</div>
<div class="min-h-screen">Alto mínimo de pantalla</div>

<!-- Display -->
<div class="block">Display block</div>
<div class="inline">Display inline</div>
<div class="inline-block">Display inline-block</div>
<div class="hidden">Oculto</div>

<!-- Overflow -->
<div class="overflow-hidden">Oculta desbordamiento</div>
<div class="overflow-scroll">Scroll siempre visible</div>
<div class="overflow-auto">Scroll automático</div>
```

### Extensiones Recomendadas para VS Code

- **Tailwind CSS IntelliSense**: Autocompletado
- **Tailwind Fold**: Colapsa clases largas para mejor legibilidad
- **Headwind**: Ordena automáticamente las clases de Tailwind

---

## Angular Material con Angular 19

Angular Material v19 introduce mejoras en rendimiento, accesibilidad y compatibilidad con las nuevas características de Angular.

### Instalación

```bash
ng add @angular/material@19
```

Durante la instalación se te preguntará por:
- **Tema preconfigurado**: Elige entre varios temas predefinidos
- **Tipografía global**: Establece estilos tipográficos globales
- **Animaciones del navegador**: Incluye animaciones de Material Design

### Configuración Manual

Si prefieres configurar manualmente, instala las dependencias:

```bash
npm install @angular/material@19 @angular/cdk@19 @angular/animations@19
```

#### 1. Importar en app.config.ts (Angular 19 Standalone)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync()
  ]
};
```

#### 2. Agregar tema en styles.css

```css
@import "tailwindcss";
@import '@angular/material/prebuilt-themes/azure-blue.css';

html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
```

### Componentes Principales

#### Botones

```typescript
// En tu componente
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <!-- Botones básicos -->
    <button mat-button>Básico</button>
    <button mat-raised-button>Elevado</button>
    <button mat-raised-button color="primary">Primario</button>
    <button mat-raised-button color="accent">Acento</button>
    <button mat-raised-button color="warn">Advertencia</button>
    
    <!-- Botones con iconos -->
    <button mat-fab>
      <mat-icon>favorite</mat-icon>
    </button>
    
    <button mat-mini-fab color="primary">
      <mat-icon>add</mat-icon>
    </button>
  `
})
```

#### Formularios

```typescript
// Importaciones necesarias
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form">
      <!-- Input básico -->
      <mat-form-field appearance="fill">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="name">
        <mat-error *ngIf="form.get('name')?.invalid">
          El nombre es requerido
        </mat-error>
      </mat-form-field>

      <!-- Select -->
      <mat-form-field appearance="fill">
        <mat-label>País</mat-label>
        <mat-select formControlName="country">
          <mat-option value="mx">México</mat-option>
          <mat-option value="us">Estados Unidos</mat-option>
          <mat-option value="ca">Canadá</mat-option>
        </mat-select>
      </mat-form-field>

      <!-- Textarea -->
      <mat-form-field appearance="fill">
        <mat-label>Comentarios</mat-label>
        <textarea matInput rows="4" formControlName="comments"></textarea>
      </mat-form-field>
    </form>
  `
})
```

#### Navegación

```typescript
// Toolbar
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
      <span>Mi App</span>
      <span class="example-spacer"></span>
      <button mat-icon-button>
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .example-spacer {
      flex: 1 1 auto;
    }
  `]
})
```

#### Tarjetas

```typescript
import { MatCardModule } from '@angular/material/card';

@Component({
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>Título de la tarjeta</mat-card-title>
        <mat-card-subtitle>Subtítulo</mat-card-subtitle>
      </mat-card-header>
      
      <img mat-card-image src="assets/example.jpg" alt="Imagen">
      
      <mat-card-content>
        <p>Contenido de la tarjeta con información relevante.</p>
      </mat-card-content>
      
      <mat-card-actions>
        <button mat-button>COMPARTIR</button>
        <button mat-button>ME GUSTA</button>
      </mat-card-actions>
    </mat-card>
  `
})
```

### Integración TailwindCSS + Angular Material

La combinación de ambas bibliotecas requiere algunas consideraciones:

#### 1. Evitar Conflictos de Estilos

```css
/* En styles.css, aplica reset específico */
.mat-mdc-button {
  @apply !font-medium;
}

.mat-mdc-form-field {
  @apply w-full;
}
```

#### 2. Ejemplo de Componente Híbrido

```typescript
@Component({
  template: `
    <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Formulario de Registro</h2>
      
      <form [formGroup]="form" class="space-y-4">
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email">
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Contraseña</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>
        
        <div class="flex gap-4 pt-4">
          <button mat-raised-button color="primary" class="flex-1">
            Registrarse
          </button>
          <button mat-button class="flex-1">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  `
})
```

### Temas Personalizados

Angular Material v19 facilita la creación de temas personalizados:

```scss
// En un archivo theme.scss
@use '@angular/material' as mat;

// Definir paleta de colores personalizada
$custom-primary: mat.define-palette(mat.$blue-palette, 600);
$custom-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
$custom-warn: mat.define-palette(mat.$red-palette);

// Crear tema
$custom-theme: mat.define-light-theme((
  color: (
    primary: $custom-primary,
    accent: $custom-accent,
    warn: $custom-warn,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

// Aplicar tema
@include mat.all-component-themes($custom-theme);
```

**Documentación oficial de Angular Material**: [Enlace por agregar]

### Mejores Prácticas

1. **Importación Selectiva**: Importa solo los módulos que necesitas
2. **Uso de Standalone Components**: Aprovecha las nuevas características de Angular 19
3. **Combinación Inteligente**: Usa TailwindCSS para layouts y espaciado, Angular Material para componentes interactivos
4. **Accesibilidad**: Angular Material incluye ARIA automáticamente
5. **Responsividad**: Combina breakpoints de Tailwind con componentes de Material
