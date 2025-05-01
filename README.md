# Proyecto Ingenieria de Software III

## Descripción General
Este proyecto es una aplicación web para la **Federación Colombiana de Taekwondo**, construida con **HTML**, **Tailwind CSS** y **Supabase** como Backend-as-a-Service (BaaS). Permite a los clubes registrarse, gestionar miembros y manejar inscripciones a torneos.

## Estructura del Proyecto
```
html-bootstrap-baas-project
├── src
│   ├── index.html           # Página de inicio de sesión
│   ├── dashboard.html       # Panel de administración para gestión de clubes y torneos
│   ├── users.html           # Panel de clubes para gestionar miembros e inscripciones
│   ├── css
│   │   └── styles.css       # Estilos personalizados
│   ├── js
│   │   ├── auth.js          # Lógica de autenticación y alertas
│   │   ├── dashboard.js     # Lógica del panel de administración
│   │   ├── login.js         # Lógica de inicio de sesión
│   │   ├── postgres.js      # Funciones de acceso a datos con Supabase/Postgres
│   │   └── supabase.js      # Cliente Supabase y funciones de inserción
│   └── assets
│       └── logo.svg         # Logo de la aplicación web
├── README.md                # Documentación del proyecto
└── .gitignore               # Archivos ignorados en control de versiones
```

## Funcionalidades

- **Registro de Clubes:** Registrar clubes con nombre, correo electrónico y nombre del sensei.
- **Gestión de Miembros:** Agregar miembros con los siguientes campos: Nombre, Apellido, Cédula, Sexo, Celular, Dirección, Correo, Cinturón, Categoría (Kumite/Kata), Peso, Talla.
- **Gestión de Torneos:** Crear y listar torneos.
- **Inscripción:** Asignar miembros a torneos.
- **Autenticación:** Iniciar y cerrar sesión mediante Supabase Auth.
- **Interfaz Responsiva:** Construida con Tailwind CSS para un diseño moderno y adaptable.
- **Alertas Modernas:** Sistema de alertas personalizadas para retroalimentación del usuario.

## Instrucciones de Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   ```
2. **Navega al directorio del proyecto:**
   ```bash
   cd html-bootstrap-baas-project
   ```
3. **Abre el archivo `src/index.html` en un navegador web para ver la aplicación.**

## Guía de Uso

- **Panel de Administración:** Usa `dashboard.html` para registrar clubes, agregar miembros y gestionar torneos.
- **Panel de Clubes:** Usa `users.html` para acciones específicas del club como ver miembros e inscribirlos en torneos.
- **Autenticación:** Solo los usuarios registrados pueden acceder al panel de administración y al panel de clubes.
- **Modificar Estilos:** Edita `src/css/styles.css` para personalizar los estilos.
- **Actualizar Lógica:** Edita los archivos en `src/js/` para cambiar o extender la funcionalidad.

## Tecnologías Utilizadas

- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Postgres, Auth)
- [Font Awesome](https://fontawesome.com/)
- JavaScript Vanilla (Módulos ES)

## Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.