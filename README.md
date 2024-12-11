# Aplicación de Usuarios y Plantas - Frontend

Este proyecto es el frontend para una aplicación de gestión de usuarios y plantas. Está construido con Angular y Material Design.

## 📌Características

- 📝 **Formulario de Login**: Permite a los usuarios ingresar sus credenciales (usuario y contraseña).
- 🔒 **Autenticación**: Se comunica con una API para validar las credenciales del usuario.
- 🎨 **Material Design**: La interfaz de usuario está elaborada con componentes de Material Design.

Después de un login exitoso, se podrá visualizar un menú en el cual el usuario podrá elegir entre dos opciones:

- 👤 **Tabla de Usuarios**: Una tabla con los datos de usuarios obtenidos de la API.
- 🪴 **Tabla Plantas**: Una tabla donde se usa un API de plantas.
En las tabla se implementa una columna con acciones; Ver, Editar y Eliminar.  
- ⚠️ **Manejo de Errores**: Se visualizan mensajes de error si las credenciales son incorrectas o si ocurre algún problema con la API, para ello se hace uso de sweetAlert.

## 💻 Requisitos

- Node.js
- Angular CLI

## 📦 Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/PeterThrs/api-laravel-fronted.git
    cd tu_repositorio_frontend
    ```

2. Instala las dependencias de npm:

    ```sh
    npm install
    ```

## 🔧Configuración

Configura la URL del backend en el archivo `src/app/services/planta.services.ts`:

```typescript
export const environment = {
  private urlBase = "http://localhost:8000/api/plants";
};
```

## 🚀 Ejecución del Servidor

Inicia el servidor de desarrollo:
```sh
ng serve


