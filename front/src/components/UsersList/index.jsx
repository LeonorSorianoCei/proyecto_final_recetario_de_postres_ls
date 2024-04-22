import React, { useState, useEffect, useContext } from 'react';
import { easyFetch } from '@/helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { UsuarioContext } from '@/pages/Context/UsuarioContext';
import { AuthContext } from '@/pages/Context/AuthContext';
import { VITE_BACKEND_URL } from '@/consts/consts';
import './users-list-styles.css';

/**
 * Componente para la lista de usuarios.
 * @hook {useContext} Hook para acceder al contexto de usuario y autentificación.
 * @function handleDeleteUser Función para manejar la eliminación de un usuario.
 * @function handleRestoreUser Función para manejar la restauración de un usuario eliminado temporalmente.
 * @function handleDeleteUserForever Función para manejar la eliminación definitiva de un usuario.
 */

function UsersList() {
  const [users, setUsers] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const { datosUsuario } = useContext(UsuarioContext); 
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []);


  
  /**
  * Obtiene la lista de usuarios de la API backend y actualiza el estado del componente con la información recibida.
  *
  * Esta función utiliza `easyFetch` para realizar una solicitud GET al endpoint `/usuarios` de la API backend.
  * Al recuperar correctamente los datos, la función de callback procesa la respuesta JSON y extrae la propiedad `data` que contiene la lista de usuarios.
  * Finalmente, el estado `users` del componente se actualiza utilizando la función `setUsers`.
  *
  * @url {string} `${VITE_BACKEND_URL}/usuarios` - URL de la API para consultar datos de los usuarios.
  * @param {function} callback - Función que se ejecuta al recibir la respuesta JSON.
  * @returns {void} No retorna ningún valor.
  */


  const fetchUsers = () => {
    easyFetch({
      url: `${VITE_BACKEND_URL}/usuarios`,
      callback: (jsonData) => {
        setUsers(jsonData.data);
      }
    });
  }

  /**
  * handleDeleteUser
  * Función para eliminar con sofdelete un usuario.
  * @param {string} userId Identificador único del usuario que se desea eliminar.
  */
  const handleDeleteUser = async (userId) => {

    if (userId === datosUsuario._id) {
      alert("¡No puedes eliminar tu propio usuario!");
      return;
    }
    
    try {
      
     /**
       * FETCH
       * Eliminar un usuario de la API.
       * @url {string} `${VITE_BACKEND_URL}/usuarios/${userId}` - URL de la API para eliminar un usuario específico.
       * @method {DELETE} - Método HTTP para eliminar recursos.
       * @param {string} userId - ID del usuario que se va a eliminar.
       * @return {Promise} Promesa que se resuelve con un mensaje de éxito o error.
       */

      const response = await easyFetch({
        method: 'DELETE',
        url: `${VITE_BACKEND_URL}/usuarios/${userId}`,
      });
      fetchUsers(); 

      //throw new Error('Error simulado');
      
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }



  /**
  * handleRestoreUser
  * Función para restaurar un usuario.
  * @param {string} userId Identificador único del usuario que se desea eliminar.
  */
  const handleRestoreUser = async (userId) => {
    try {
      
     /**
       * FETCH
       * Restaurar un usuario eliminado temporalmente de la API.
       * @url {string} `${VITE_BACKEND_URL}/usuarios/${userId}` - URL de la API para restaurar un usuario específico.
       * @method {PATCH} - Método HTTP para actualizar recursos parcialmente.
       * @params {Object} body - Objeto JSON que contiene los datos para la restauración.
       *   * @param {null} body.deleted_at - Se establece el valor de `deleted_at` a `null` para indicar que el usuario ya no está eliminado.
       * @return {Promise} Promesa que se resuelve con un mensaje de éxito o error.
       */

      await easyFetch({
        method: 'PATCH',
        url: `${VITE_BACKEND_URL}/usuarios/${userId}`,
        body: { deleted_at: null }, 
      });
      fetchUsers(); 
    } catch (error) {
      console.error('Error al restaurar el usuario:', error);
    }
  }




  /**
  * handleDeleteUserForever
  * Función para eliminar un usuario definitivamente.
  * @param {string} userId Identificador único del usuario que se desea eliminar.
  */
  const handleDeleteUserForever = async (userId) => {
    try {
      
      /**
       * FETCH
       * Eliminar un usuario de forma definitiva de la API.
       * @url {string} `${VITE_BACKEND_URL}/usuarios/${userId}/forever` - URL de la API para eliminar definitivamente un usuario específico.
       * @method {DELETE} - Método HTTP para eliminar recursos.
       * @param {string} userId - ID del usuario que se va a eliminar definitivamente.
       * @return {Promise} Promesa que se resuelve con un mensaje de éxito o error.
       */
      
      await easyFetch({
        method: 'DELETE',
        url: `${VITE_BACKEND_URL}/usuarios/${userId}/forever`, 
      });
      fetchUsers(); 
    } catch (error) {
      console.error('Error al eliminar definitivamente el usuario:', error);
    }
  }

  const activeUsers = users.filter(user => !user.deleted_at);
  const deletedUsers = users.filter(user => user.deleted_at);

  if (!isLogged) {
    alert ("¡Inicia sesión primero!")
  }

  return (
    <>
      <section className="postres-list-container">
              <h2>Lista de Usuarios</h2>
              <button onClick={() => setShowDeleted(!showDeleted)}>
                {showDeleted ? 'Ocultar eliminados' : 'Mostrar eliminados'}
              </button>

              {showDeleted && (
                <section className="eliminados">
                  <h3>Usuarios eliminados</h3>
                  {deletedUsers.length > 0 ? (
                   deletedUsers.map(({ nombre, _id, deleted_at }) => (
                    deleted_at && (
                      <div key={_id}>
                        {nombre} <button onClick={() => handleRestoreUser(_id)} title="RESTAURAR">
                          <FontAwesomeIcon icon={faUndo} />
                        </button>
                        <button onClick={() => handleDeleteUserForever(_id)} title="ELIMINAR DEFINITIVAMENTE">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    )
                  ))
                  ) : (
                    <p>No hay usuarios eliminados temporalmente</p>
                  )}
                </section>
              )}


              <div className="card-list">
                {activeUsers.map(({ _id, nombre, imagen, descripcion }) => (
                  <div className="card-user" key={_id}>
                    <h3>{nombre}</h3>
                    <img src={`${VITE_BACKEND_URL}/files/${imagen}`} alt={nombre} />
                    <section className='texto'>
                      <p>{descripcion}</p>
                    </section>
                    <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteUser(_id); }}>
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
      </section>
    </>
  );
}

export default UsersList;
