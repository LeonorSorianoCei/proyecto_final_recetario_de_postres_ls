/**
 * @description Obtiene la URL del backend desde las variables de entorno
 * 
 * Este código utiliza la variable de entorno `VITE_BACKEND_URL` que ha sido inyectada en el
 * proceso de construcción de la aplicación usando Vite. Esta variable contiene la URL del
 * servidor backend que la aplicación frontend debe utilizar para realizar las solicitudes.
 */
export const { VITE_BACKEND_URL } = import.meta.env;


