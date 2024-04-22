import { createContext } from 'react';

/**
 * Contexto de administración
 * Este contexto se utiliza para gestionar la administración en la aplicación.
 * 
 * @context
 * @property    {Boolean}       IsAdmin                 - Boleano para ser o no administrador.
 * @components  {LoginForm, Layout, Home, Navigation}   - Se usa en los componentes: LoginForm, Layout, Home, Navigation.
 */

export const AdminContext = createContext();