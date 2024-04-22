import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons'; 
import { easyFetch } from '@/helpers/utils';
import { VITE_BACKEND_URL } from '@/consts/consts';
import { PostreContext } from '@/pages/Context/PostreContext';
import { UsuarioContext } from '@/pages/Context/UsuarioContext';
import { AuthContext } from '@/pages/Context/AuthContext';
import PostreLightbox from '@/components/PostreLightbox';
import PostreFormEdit from '@/components/PostreFormEdit';
import './postres-list-styles.css';


/**
 * Componente para la lista de postres.
 * @hook {useContext} Hook para acceder al contexto de usuario, postres y autentificación.
 * @hook {useState} Hook para manejar el estado de la lista de postres y el postre seleccionado.
 * @hook {useEffect} Hook para realizar efectos secundarios en la inicialización.
 * @function handleDeletePostre Función para manejar la eliminación de un postre.
 * @function handleRestorePostre Función para manejar la restauración de un postre eliminado temporalmente.
 * @function handleDeletePostreForever Función para manejar la eliminación definitiva de un postre.
 */

function PostresList() {
  const { postresList, setPostresList } = useContext(PostreContext);
  const { datosUsuario } = useContext(UsuarioContext);
  const [selectedPostre, setSelectedPostre] = useState(null);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false); 
  const [difficultyFilter, setDifficultyFilter] = useState(null); 
  const { isLogged } = useContext(AuthContext);
  
  useEffect(() => {
    fetchPostres();
  }, []);


  /**
  * Obtiene la lista de postres de la API backend y actualiza el estado del componente con la información recibida.
  *
  * Esta función utiliza `easyFetch` para realizar una solicitud GET al endpoint `/postres` de la API backend.
  * Al recuperar correctamente los datos, la función de callback procesa la respuesta JSON y extrae la propiedad `jsonData` que contiene la lista de postres.
  * Finalmente, el estado `postresList` del componente se actualiza utilizando los datos de `postresUsuario` .
  *
  * @url {string} `${VITE_BACKEND_URL}/postres` - URL de la API para consultar datos de los postres.
  * @param {function} callback - Función que se ejecuta al recibir la respuesta JSON.
  * @returns {void} No retorna ningún valor.
  */

  const fetchPostres = () => {
    easyFetch({
      url: `${VITE_BACKEND_URL}/postres`,
      callback: (jsonData) => {
        const postresUsuario = jsonData.data.filter(postre => postre._idUser === datosUsuario._id);
        setPostresList(postresUsuario);
      }
    });
  }

  const handlePostreClick = (postre) => {
    setSelectedPostre(postre);
    setIsLightBoxOpen(!isLightBoxOpen);
  }


  /**
  * handleDeletePostre
  * Función para eliminar con sofdelete un postre.
  * @param {string} postrerId Identificador único del postre que se desea eliminar.
  */
  const handleDeletePostre = async (postreId) => {
    try {
      /**
     * FETCH
     * Eliminar un postre de la API.
     * @url {string} `${VITE_BACKEND_URL}/postres/${postreId}` - URL de la API para eliminar un postre específico.
     * @method {DELETE} - Método HTTP para eliminar recursos.
     * @param {string} postreId - ID del postre que se va a eliminar.
     * @return {Promise} Promesa que se resuelve con un mensaje de éxito o error.
     */
      await easyFetch({
        method: 'DELETE',
        url: `${VITE_BACKEND_URL}/postres/${postreId}`,
      });
      fetchPostres();

    //throw new Error('Error simulado');

    } catch (error) {
      console.error('Error al borrar el postre:', error);
    }
  }



  /**
  * handleRestorePostre
  * Función para restaurar un postre.
  * @param {string} postreId Identificador único del postre que se desea eliminar.
  */
  const handleRestorePostre = async (postreId) => {
    try {
      await easyFetch({
        method: 'PATCH', 
        url: `${VITE_BACKEND_URL}/postres/${postreId}`,
        body: { deleted_at: null }, 
      });
      fetchPostres();
    
      //throw new Error('Error simulado');

    } catch (error) {
      console.error('Error al restaurar el postre:', error);
    }
  }


 
  /**
  * handleDeletePostreForever
  * Función para eliminar un postre definitivamente.
  * @param {string} postreId Identificador único del postre que se desea eliminar.
  */
  const handleDeletePostreForever = async (postreId) => {
    try {
      /**
       * FETCH
       * Eliminar un postre de la API de forma permanente.
       * @url {string} `${VITE_BACKEND_URL}/postres/${postreId}/forever` - URL de la API para eliminar un postre específico de forma permanente.
       * @method {DELETE} - Método HTTP para eliminar recursos.
       * @param {string} postreId - ID del postre que se va a eliminar.
       * @return {Promise} Promesa que se resuelve con un mensaje de éxito o error.
      */
     
      await easyFetch({
        method: 'DELETE',
        url: `${VITE_BACKEND_URL}/postres/${postreId}/forever`, 
      });
      fetchPostres();

     //throw new Error('Error simulado');

    } catch (error) {
      console.error('Error al eliminar definitivamente el postre:', error);
    }
  }



  const postresActivos = postresList.filter(postre => !postre.deleted_at);
  const filteredPostres = difficultyFilter ? postresActivos.filter(postre => postre.dificultad === difficultyFilter) : postresActivos;

  const { nombre } = datosUsuario || {};

  if (!isLogged) {
    alert ("¡Inicia sesión primero!")
  }

  
  return (
    <>
      <section className="postres-list-container">
              <h2>Lista de Postres</h2>
              <button onClick={() => setShowDeleted(!showDeleted)}>
                {showDeleted ? 'Ocultar eliminados' : 'Mostrar eliminados'}
              </button>

              {showDeleted && (
                <section className='eliminados'>
                  <h3>Postres eliminados</h3>
                  {postresList.filter(postre => postre.deleted_at).length > 0 ? (
                    postresList.map(({ nombre, _id, deleted_at }) => (
                      deleted_at && (
                        <div key={_id}>
                          {nombre} <button onClick={() => handleRestorePostre(_id)} title="RESTAURAR">
                            <FontAwesomeIcon icon={faUndo} />
                          </button>
                          <button onClick={() => handleDeletePostreForever(_id)} title="ELIMINAR DEFINITIVAMENTE">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      )
                    ))
                  ) : (
                    <p>No hay postres eliminados temporalmente</p>
                  )}
                </section>
              )}

              <section className='filtros'>
                    <button className={`filtros-btn ${difficultyFilter === null && 'active-filter'}`} onClick={() => setDifficultyFilter(null)}>Mostrar todos</button>
                    <button className={`filtros-btn ${difficultyFilter === 'Baja' && 'active-filter'}`} onClick={() => setDifficultyFilter('Baja')}>Dificultad baja</button>
                    <button className={`filtros-btn ${difficultyFilter === 'Media' && 'active-filter'}`} onClick={() => setDifficultyFilter('Media')}>Dificultad media</button>
                    <button className={`filtros-btn ${difficultyFilter === 'Alta' && 'active-filter'}`} onClick={() => setDifficultyFilter('Alta')}>Dificultad alta</button>
                </section>

              {filteredPostres.length > 0 ? (
                <div className="card-list">
                  {filteredPostres.map(({ _id, nombre, imagen, descripcion, ingredientes, dificultad, tiempo, instrucciones }) => (
                    <div className="card-item" key={_id} onClick={() => handlePostreClick({ _id, nombre, imagen, descripcion, ingredientes, dificultad, tiempo, instrucciones })}>
                      <h3>{nombre}</h3>
                      <img src={`${VITE_BACKEND_URL}/files/${imagen}`} alt={nombre} />
                      <section className='texto'>
                      <p>Dificultad: {dificultad}</p>
                        <p>{descripcion}</p>
                        <p>Ingredientes: {ingredientes}</p>
                        <p>Tiempo: {tiempo}</p>
                      </section>
                      <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeletePostre(_id); }}>
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-postres-message">
                  <h1>¡{nombre}, aquí no hay ningún postre!</h1>
                </div>
              )}
              {isLightBoxOpen && (
                <PostreLightbox isOpen={isLightBoxOpen} onClose={handlePostreClick} postre={selectedPostre}>
                  <PostreFormEdit key={selectedPostre._id} postreId={selectedPostre._id} />
                </PostreLightbox>
              )}

      </section>
    </>
  );
}

export default PostresList;
