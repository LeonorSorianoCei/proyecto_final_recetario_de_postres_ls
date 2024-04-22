import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsuarioContext } from '@/pages/Context/UsuarioContext';
import { AuthContext } from '@/pages/Context/AuthContext';
import { VITE_BACKEND_URL } from '@/consts/consts';
import './postre-form-create-styles.css';


/**
 * Componente para el formulario de creación de postres.
 * @hook {useContext} Hook para acceder al contexto de usuario y autenticación.
 * @param {Function} handleSubmit Función para manejar el envío del formulario.
 * @param {Function} handleFileChange Función para manejar que solo se puedan subir archivos de imagen.
 */

const PostreFormCreate = () => {
      const { datosUsuario } = useContext(UsuarioContext); 
      const { isLogged } = useContext(AuthContext); 
      const navegador = useNavigate();

       /**
       * handleSubmit
       * Función que maneja el envío del formulario de inicio de sesión.
       * @param {Event} e Objeto de evento que representa el envío del formulario.
       * @return {Promise} Promesa que se resuelve con los datos del usuario logueado o se rechaza con un error.
       */

      const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            formData.append('userId', datosUsuario._id);

            try {
                  /**
                  * FETCH
                  * Enviar los datos del formulario para crear un nuevo postre.
                  * @url {string} `${VITE_BACKEND_URL}/upload` - URL de la API para cargar postres.
                  * @method {POST} - Método HTTP para crear recursos.
                  * @params {FormData} formData - Objeto FormData que contiene los datos del formulario.
                     * @param {string} formData.nombre - Nombre del postre.
                     * @param {File} formData.imagen_subida - Archivo de imagen del postre.
                     * @param {string} formData.descripcion - Descripción del postre.
                     * @param {string} formData.ingredientes - Ingredientes del postre.
                     * @param {string} formData.instrucciones - Instrucciones para preparar el postre.
                     * @param {string} formData.dificultad - Dificultad de preparación del postre (Alta, Media, Baja).
                     * @param {string} formData.tiempo - Tiempo de preparación del postre.
                     * @param {string} formData.userId - ID del usuario que crea el postre.
                  * @return {Promise} Promesa que se resuelve con un mensaje de éxito o error.
                  */

                  const response = await fetch(`${VITE_BACKEND_URL}/upload`, {
                    method: 'POST',
                    body: formData 
                  });
                
                  if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                  }
                
                  const data = await response.json();
                  navegador("/lista");

            } catch (error) {
                  console.error('Error al crear el postre:', error);
            }
      };

      /**
      * handleFileChange
      * Función que maneja el tipo de archivo en el input de tipo "file".
      * @param {Event} e Objeto de evento que representa el cambio de archivo.
      */
      const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  const fileType = file.type.split('/')[0];
                  if (fileType !== 'image') {
                    alert('Por favor, selecciona un archivo de imagen.');
                    e.target.value = null;
                  }
            }
      };


      if (!isLogged) {
        alert ("¡Inicia sesión primero!")
      }

  return (
    <>
      <form onSubmit={handleSubmit} className="postres-form-container galada-font">
        <label>Nombre del Postre</label>
        <input
          type="text"
          className="input-control"
          name="nombre"
          placeholder="Ingrese nombre del postre"
          required 
        /><br />

        <label className="file-label">Selecciona una imagen</label><br />
        <div className="file-input">
            <input 
              type="file" 
              name="imagen_subida" 
              required  
              onChange={handleFileChange}  
            /><br />
        </div>

        <label>Descripción</label>
        <textarea
          className="input-control"
          name="descripcion"
          placeholder="Ingrese descripción del postre"
          required 
        /><br />

        <label>Ingredientes</label>
        <textarea
          className="input-control"
          name="ingredientes"
          placeholder="Ingrese los ingredientes del postre"
          required 
        /><br />

        <label>Instrucciones</label>
        <textarea
          className="input-control"
          name="instrucciones"
          placeholder="Ingrese las instrucciones para preparar el postre"
          required 
        /><br />

        <label>Dificultad</label>
        <select className="input-control" name="dificultad" required>
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
          required 
        /><br />

        <input type="submit" value="Crear postre" className="crear-btn" />
      </form>
    </>
  );
};

export default PostreFormCreate;
