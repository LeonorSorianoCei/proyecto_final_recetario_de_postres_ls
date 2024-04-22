import { createContext } from 'react';

/**
 * Contexto de autenticación AuthContext
 * Este contexto se utiliza para gestionar la autenticación de usuarios en la aplicación.
 * 
 * @context
 * @property    {Object}        usuario                 - Los datos del usuario autenticado.
 * @property    {Function}      LoginForm               - Función para iniciar sesión.
 * @property    {Function}      RegisterForm            - Función para registrarse.
 * @property    {Function}      DeleteUser              - Función para eliminar usuarios con softdelete.
 * @property    {Function}      DeleteUserForever       - Función para eliminar permanentemente usuarios.
 * @property    {Function}      RestoreUser             - Función para restaurar usuarios eliminados con softdelete.
 * @components  {LoginForm, Layout, Home, Navigation}   - Se usa en los componentes: LoginForm, Layout, Home, Navigation.
 */

export const AuthContext = createContext();