# Aplicación de Usuarios y Plantas - Frontend

Este proyecto es el frontend para una aplicación de gestión de usuarios y plantas. Está construido con Angular y Material Design.

## Requisitos

- Node.js
- Angular CLI

## Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/PeterThrs/api-laravel-fronted.git
    cd tu_repositorio_frontend
    ```

2. Instala las dependencias de npm:

    ```sh
    npm install
    ```

## Configuración

Configura la URL del backend en el archivo `src/app/services/planta.services.ts`:

```typescript
export const environment = {
  private urlBase = "http://localhost:8000/api/plants";
};

## 🚀 Ejecución del Servidor

Inicia el servidor de desarrollo:
```sh
ng serve


