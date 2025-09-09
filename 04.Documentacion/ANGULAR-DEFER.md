# Guía de @defer en Angular 19

**Documentación oficial de @defer**: https://angular.dev/guide/templates/defer

## ¿Qué es @defer?

Los bloques `@defer`, también conocidos como vistas diferidas, reducen el tamaño inicial del bundle de tu aplicación al diferir la carga de código que no es estrictamente necesario para el renderizado inicial de una página. Esto a menudo resulta en una carga inicial más rápida y una mejora en los Core Web Vitals (CWV), principalmente Largest Contentful Paint (LCP) y Time to First Byte (TTFB).

### Sintaxis Básica

```typescript
@defer {
  <large-component />
}
```

El código de cualquier componente, directiva y pipe dentro del bloque `@defer` se divide en un archivo JavaScript separado y se carga solo cuando es necesario, después de que el resto del template haya sido renderizado.

## ¿Qué dependencias son diferidas?

### Requisitos para el Diferido

Para que las dependencias dentro de un bloque `@defer` sean diferidas, deben cumplir dos condiciones:

1. **Deben ser standalone**: Las dependencias no standalone no pueden ser diferidas y siguen siendo cargadas eagerly
2. **No pueden ser referenciadas fuera de bloques @defer**: Si son referenciadas fuera del bloque @defer o dentro de queries ViewChild, las dependencias serán cargadas eagerly

### Componentes que Pueden ser Diferidos

```typescript
// Componente standalone - PUEDE ser diferido
@Component({
  selector: 'app-large-component',
  standalone: true,
  template: `<h1>Componente pesado</h1>`
})
export class LargeComponent {}

// Componente NgModule - NO puede ser diferido
@Component({
  selector: 'app-old-component',
  template: `<h1>Componente antiguo</h1>`
})
export class OldComponent {}

@NgModule({
  declarations: [OldComponent]
})
export class SomeModule {}
```

## Bloques de Gestión de Estados

Los bloques `@defer` tienen varios sub-bloques para manejar elegantemente las diferentes etapas del proceso de carga diferida.

### @defer - Bloque Principal

```typescript
@Component({
  template: `
    @defer {
      <large-component />
    }
  `
})
export class ExampleComponent {}
```

Por defecto, un bloque `@defer` se activa cuando el estado del navegador se vuelve inactivo (idle).

### @placeholder - Contenido de Marcador

Declara qué contenido mostrar antes de que el bloque `@defer` sea activado:

```typescript
@Component({
  template: `
    @defer {
      <large-component />
    } @placeholder {
      <div class="bg-gray-200 animate-pulse p-4 rounded">
        <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    }
  `
})
export class PlaceholderExampleComponent {}
```

#### Parámetro de Tiempo Mínimo

Especifica el tiempo mínimo que debe mostrarse el placeholder:

```typescript
@Component({
  template: `
    @defer {
      <large-component />
    } @placeholder (minimum 500ms) {
      <p>Este placeholder se mostrará por al menos 500ms</p>
    }
  `
})
export class MinimumPlaceholderComponent {}
```

### @loading - Contenido de Carga

Muestra contenido mientras las dependencias diferidas se están cargando:

```typescript
@Component({
  template: `
    @defer {
      <large-component />
    } @loading {
      <div class="flex items-center justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-2 text-gray-600">Cargando...</span>
      </div>
    } @placeholder {
      <div class="bg-gray-100 p-4 rounded">
        Haz clic para cargar el componente
      </div>
    }
  `
})
export class LoadingExampleComponent {}
```

#### Parámetros de Tiempo para @loading

```typescript
@Component({
  template: `
    @defer {
      <large-component />
    } @loading (after 100ms; minimum 1s) {
      <div class="loading-spinner">
        <img src="loading.gif" alt="Cargando..." />
        <p>Cargando componente...</p>
      </div>
    }
  `
})
export class TimedLoadingComponent {}
```

- `after`: Tiempo de espera antes de mostrar el estado de carga
- `minimum`: Tiempo mínimo que debe mostrarse el estado de carga

### @error - Estado de Error

Muestra contenido si la carga diferida falla:

```typescript
@Component({
  template: `
    @defer {
      <problematic-component />
    } @error {
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <span>Error al cargar el componente. Intenta recargar la página.</span>
        </div>
      </div>
    } @placeholder {
      <div>Componente por cargar</div>
    }
  `
})
export class ErrorHandlingComponent {}
```

## Triggers - Controlando la Carga

Puedes especificar triggers que controlan cuándo Angular carga y muestra el contenido diferido.

### Múltiples Triggers

```typescript
@Component({
  template: `
    @defer (on interaction; on timer(2s)) {
      <large-component />
    } @placeholder {
      <button class="bg-blue-500 text-white px-4 py-2 rounded">
        Cargar componente (clic o después de 2s)
      </button>
    }
  `
})
export class MultiTriggerComponent {}
```

### Tipos de Triggers: `on`

#### 1. `idle` (Por defecto)

```typescript
@Component({
  template: `
    @defer (on idle) {
      <large-component />
    } @placeholder {
      <div>Se cargará cuando el navegador esté inactivo</div>
    }
  `
})
export class IdleTriggerComponent {}
```

#### 2. `viewport`

Carga cuando el contenido especificado entra en el viewport:

```typescript
@Component({
  template: `
    <!-- Usando el placeholder como elemento observado -->
    @defer (on viewport) {
      <large-component />
    } @placeholder {
      <div class="h-20 bg-gray-200 flex items-center justify-center">
        Este componente se cargará cuando entre en viewport
      </div>
    }

    <!-- Usando una referencia específica -->
    <div #triggerElement class="h-32 bg-blue-200 mb-4">
      Elemento trigger
    </div>
    
    @defer (on viewport(triggerElement)) {
      <another-component />
    }
  `
})
export class ViewportTriggerComponent {}
```

#### 3. `interaction`

Carga cuando el usuario interactúa (click o keydown):

```typescript
@Component({
  template: `
    <!-- Interacción con el placeholder -->
    @defer (on interaction) {
      <large-component />
    } @placeholder {
      <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
        Haz clic para cargar
      </button>
    }

    <!-- Interacción con elemento específico -->
    <button #loadButton class="bg-purple-500 text-white px-4 py-2 rounded">
      Botón de carga
    </button>
    
    @defer (on interaction(loadButton)) {
      <another-component />
    }
  `
})
export class InteractionTriggerComponent {}
```

#### 4. `hover`

Carga cuando el mouse pasa sobre el área especificada:

```typescript
@Component({
  template: `
    @defer (on hover) {
      <tooltip-content />
    } @placeholder {
      <div class="bg-yellow-200 p-4 rounded cursor-pointer">
        Pasa el mouse aquí para cargar el tooltip
      </div>
    }

    <!-- Hover en elemento específico -->
    <div #hoverArea class="w-32 h-32 bg-red-200 rounded">
      Área de hover
    </div>
    
    @defer (on hover(hoverArea)) {
      <hover-details />
    }
  `
})
export class HoverTriggerComponent {}
```

#### 5. `immediate`

Carga inmediatamente después del contenido no diferido:

```typescript
@Component({
  template: `
    <h1>Contenido principal</h1>
    
    @defer (on immediate) {
      <secondary-content />
    } @placeholder {
      <div>Cargando contenido secundario...</div>
    }
  `
})
export class ImmediateTriggerComponent {}
```

#### 6. `timer`

Carga después de una duración específica:

```typescript
@Component({
  template: `
    @defer (on timer(3s)) {
      <delayed-component />
    } @placeholder {
      <div class="text-center p-4">
        <div class="animate-pulse">Cargando en 3 segundos...</div>
      </div>
    }
  `
})
export class TimerTriggerComponent {}
```

### Tipo de Trigger: `when`

Acepta una expresión condicional personalizada:

```typescript
@Component({
  template: `
    <button (click)="showContent = !showContent" 
            class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
      Toggle Content ({{ showContent ? 'Ocultar' : 'Mostrar' }})
    </button>

    @defer (when showContent) {
      <conditional-component />
    } @placeholder {
      <div class="text-gray-500">
        Contenido oculto - haz clic en el botón para mostrar
      </div>
    }
  `
})
export class ConditionalTriggerComponent {
  showContent = false;
}
```

**Nota importante**: `when` es una operación de una sola vez. El bloque no revierte al placeholder si la condición cambia a falsy después de volverse truthy.

## Prefetching - Carga Anticipada

El prefetching permite cargar el JavaScript asociado con el bloque `@defer` antes de que el contenido diferido sea mostrado:

```typescript
@Component({
  template: `
    <!-- Prefetch cuando idle, mostrar cuando interaction -->
    @defer (on interaction; prefetch on idle) {
      <heavy-component />
    } @placeholder {
      <button class="bg-blue-500 text-white px-4 py-2 rounded">
        Cargar componente (ya prefetcheado)
      </button>
    }

    <!-- Prefetch en hover, cargar en click -->
    @defer (on interaction; prefetch on hover) {
      <another-heavy-component />
    } @placeholder {
      <div class="bg-gray-200 hover:bg-gray-300 p-4 rounded cursor-pointer">
        Hover para prefetch, click para mostrar
      </div>
    }
  `
})
export class PrefetchingComponent {}
```

## Ejemplos Prácticos

### 1. Dashboard con Widgets Diferidos

```typescript
@Component({
  selector: 'app-dashboard',
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <!-- Widget crítico - carga inmediata -->
      <div class="bg-white rounded-lg shadow p-4">
        <user-profile />
      </div>

      <!-- Widget de estadísticas - carga cuando entra en viewport -->
      @defer (on viewport) {
        <statistics-widget />
      } @placeholder {
        <div class="bg-white rounded-lg shadow p-4">
          <div class="animate-pulse">
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-8 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      } @loading {
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span class="ml-2">Cargando estadísticas...</span>
          </div>
        </div>
      }

      <!-- Widget de notificaciones - carga después de 2s -->
      @defer (on timer(2s)) {
        <notifications-widget />
      } @placeholder {
        <div class="bg-white rounded-lg shadow p-4 text-center text-gray-500">
          Notificaciones cargando...
        </div>
      }
    </div>
  `
})
export class DashboardComponent {}
```

### 2. Modal Diferido

```typescript
@Component({
  selector: 'app-user-list',
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      
      <div class="grid gap-4">
        <div *ngFor="let user of users" 
             class="bg-white rounded-lg shadow p-4 flex justify-between items-center">
          <div>
            <h3 class="font-semibold">{{ user.name }}</h3>
            <p class="text-gray-600">{{ user.email }}</p>
          </div>
          <button (click)="selectedUserId = user.id"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Ver Detalles
          </button>
        </div>
      </div>

      <!-- Modal diferido - solo carga cuando se selecciona un usuario -->
      @defer (when selectedUserId) {
        <user-detail-modal 
          [userId]="selectedUserId" 
          (close)="selectedUserId = null" />
      } @loading {
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-6">
            <div class="flex items-center">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span class="ml-2">Cargando detalles del usuario...</span>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class UserListComponent {
  selectedUserId: string | null = null;
  
  users = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
    { id: '2', name: 'María García', email: 'maria@example.com' }
  ];
}
```

### 3. Formulario con Secciones Avanzadas

```typescript
@Component({
  selector: 'app-user-form',
  template: `
    <form class="max-w-2xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Registro de Usuario</h2>

      <!-- Campos básicos - siempre cargados -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <input placeholder="Nombre" class="border rounded px-3 py-2">
        <input placeholder="Email" class="border rounded px-3 py-2">
      </div>

      <!-- Sección avanzada - carga por interacción -->
      <div class="mb-6">
        @defer (on interaction; prefetch on hover) {
          <advanced-form-section />
        } @placeholder {
          <button type="button" 
                  class="w-full bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600">
            <span class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Mostrar campos avanzados
            </span>
          </button>
        } @loading (minimum 300ms) {
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="animate-pulse space-y-4">
              <div class="h-4 bg-gray-300 rounded w-1/4"></div>
              <div class="h-10 bg-gray-300 rounded"></div>
              <div class="h-4 bg-gray-300 rounded w-1/3"></div>
              <div class="h-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        }
      </div>

      <button type="submit" 
              class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Registrar Usuario
      </button>
    </form>
  `
})
export class UserFormComponent {}
```
