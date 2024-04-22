# Recetario de Postres: Backend y Frontend

Este proyecto consiste en un CRUD (Create, Read, Update, Delete) para gestionar un recetario de postres. Incluye tanto el desarrollo del backend como del frontend para una experiencia completa de usuario.

## Tecnologías Utilizadas

### Backend
- **Express**: Framework de Node.js para el desarrollo del servidor y la lógica de la aplicación.

### Frontend
- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.

## Funcionalidades

- **Gestión de Postres**: Permite crear, ver, modificar y eliminar postres, ya sea definitivamente o con la posibilidad de restaurarlo.
- **Autenticación de Usuarios**: Incluye una página de registro e inicio de sesión para usuarios.
- **Roles de Usuario**: Diferencia entre administradores y usuarios estándar. Los administradores tienen acceso a funcionalidades adicionales como es la gestión de usuarios, mientras que un usuario estándar no puede acceder a esa página pero si puede acceder a las páginas de bienvenida, lista de postres y agregar postres.
- **Inicio de sesión**: Diferencia entre los usuarios que han iniciado sesión y los que no. Un usuario que no ha iniciado sesión ve las páginas de bienvenida y la acceder, mientras que los que si han iniciado sesión pueden ver las otras páginas mencionadas en el punto anterior y que dependen también de su rol. Pero además, la página de bienvenida esta personalizada y su contenido varía según rol y según sesión iniciada o no.
- **Gestión de Usuarios (Solo para Administradores)**: Los administradores pueden ver un listado de usuarios, eliminarlos temporalmente y restaurarlos. También tienen la opción de eliminar usuarios de manera definitiva.

## Uso del Proyecto

Para utilizar este proyecto, sigue los siguientes pasos:

1. Clona este repositorio en tu máquina local.
2. Ejecuta el servidor backend.
3. Ejecuta la aplicación frontend.
4. Accede a la aplicación desde tu navegador web.

## Aplicación publicada

Si deseas probar la aplicación, accede a [este enlace](https://front-postres-proyecto-final-ls.vercel.app/).

La API esta publicada en [este enlace](https://postres-proyecto-final.vercel.app/).



