import { createContext } from 'react';

/**
 * Contexto de información sobre los postres 
 * Este contexto se utiliza para gestionar los datos de los postres en la aplicación.
 * 
 * @context
 * @property    {Object}        postre                 - Los datos del postre.
 * @property    {Function}      PostreFormCreate       - Función para crear postres.
 * @property    {Function}      PostreFormEdit         - Función para editar postres.
 * @property    {Function}      DeletePostre           - Función para eliminar postres con softdelete.
 * @property    {Function}      DeletePostreForever    - Función para eliminar permanentemente postres.
 * @property    {Function}      RestorePostre          - Función para restaurar postres eliminados con softdelete.
 * @components  {PostresList, PostresFormEdit, Layout} - Se usa en los componentes: PostresList, PostresFormEdit, Layout.
 */

export const PostreContext = createContext();