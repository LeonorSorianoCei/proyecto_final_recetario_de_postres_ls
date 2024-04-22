import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'; 
import { UsuarioContext } from '@/pages/Context/UsuarioContext';
import { PostreContext } from '@/pages/Context/PostreContext';
import { VITE_BACKEND_URL } from '@/consts/consts';
import './postre-form-edit-styles.css';

/**
 * Componente para el formulario de edición de un postre.
 * @hook {useContext} Hook para acceder al contexto de usuario.
 * @hook {useNavigate} Hook para navegar a través de la aplicación.
 * @param {String} postreId ID del postre a editar.
 * @param {Function} handleSubmit Función para manejar el envío del formulario de edición del postre.
 * @param {Function} handleFileChange Función para manejar que solo se puedan subir archivos de imagen.
 */

const PostreFormEdit = ({ postreId }) => {
  const { datosUsuario } = useContext(UsuarioContext); 
  const { postresList, setPostresList } = useContext(PostreContext); 
  const navegador = useNavigate();

   /**
  * handleSubmit
  * Función que maneja el envío del formulario de inicio de sesión.
  * @param {Event} e Objeto de evento que representa el envío del formulario.
  * @return {Promise} Promesa que se resuelve con los datos del usuario logueado o se rechaza con un error.
  */

  const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      formData.append('userId', datosUsuario._id);
      const requestData = {};
      formData.forEach((value, key) => {
        requestData[key] = value;
      });


      /**
       * FETCH
       * Editar un postre existente.
       * @url {string} `${VITE_BACKEND_URL}/postres/${postreId}` - URL de la API para editar un postre específico.
       * @method {PUT} - Método HTTP para actualizar recursos.
       * @params {Object} requestData - Objeto JSON que contiene los datos actualizados del postre.
       *   * @param {string} requestData.nombre - Nombre del postre.
       *   * @param {string} requestData.descripcion - Descripción del postre.
       *   * @param {string} requestData.ingredientes - Ingredientes del postre.
       *   * @param {string} requestData.instrucciones - Instrucciones para preparar el postre.
       *   * @param {string} requestData.dificultad - Dificultad de preparación del postre (Alta, Media, Baja).
       *   * @param {string} requestData.tiempo - Tiempo de preparación del postre.
       * @return {Promise} Promesa que se resuelve con un mensaje de éxito o error.
       */
  
      fetch(`${VITE_BACKEND_URL}/postres/${postreId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
      })

      .then(data => {
        // Actualiza solo el postre editado en la lista de postres
        const updatedPostresList = postresList.map(postre => {
          if (postre._id === postreId) {
            return {...data}; // Utiliza el operador spread para crear un nuevo objeto postre
          }
          return postre;
        });
    
        setPostresList(updatedPostresList); // Actualiza la lista de postres en el contexto
        alert("¡Postre actualizado!");
        navegador("/");
      })

      .catch(error => {
        console.error('Error al actualizar el postre:', error);
      });
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="postres-form-container galada-font">
    
        <label>Nombre del Postre</label>
        <input
          type="text"
          className="input-control"
          name="nombre"
          placeholder="Ingrese nombre del postre"
        /><br />

        <label>Descripción</label>
        <textarea
          className="input-control"
          name="descripcion"
          placeholder="Ingrese descripción del postre"
        /><br />

        <label>Ingredientes</label>
        <textarea
          className="input-control"
          name="ingredientes"
          placeholder="Ingrese los ingredientes del postre"
        /><br />

        <label>Instrucciones</label>
        <textarea
          className="input-control"
          name="instrucciones"
          placeholder="Ingrese las instrucciones para preparar el postre"
        /><br />

        <label>Dificultad</label>
        <select className="input-control" name="dificultad" >
          <option value="">Seleccionar dificultad</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select><br />

        <label>Tiempo</label>
        <input
          type="text"
          className="input-control"
          name="tiempo"
          placeholder="Ingrese el tiempo de preparación del postre"
           // Campo obligatorio
        /><br />

        <input type="submit" value="Actualizar" className="crear-btn" />
      </form>
    </>
  );
};

export default PostreFormEdit;
