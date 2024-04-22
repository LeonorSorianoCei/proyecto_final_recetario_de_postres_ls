import React from 'react';
import useConfirmationMessage from '@/hook/use-confirmation-message.js';
import { VITE_BACKEND_URL } from '@/consts/consts';
import './register-form-styles.css';


/**
 * Componente para el formulario de registro de usuario.
 * @hook {useConfirmationMessage} Hook para mostrar mensajes de confirmación de éxito o fracaso en el registro.
 * @hook {useState} Estado para almacenar el mensaje de confirmación.
 * @param {Function} handleSubmit Función para manejar el envío del formulario.
 * @param {Function} handleFileChange Función para manejar que solo se puedan subir archivos de imagen.
 */

const RegisterForm = () => {

  const [confirmationMessage, setConfirmationMessage] = useConfirmationMessage();

   /**
  * handleSubmit
  * Función que maneja el envío del formulario de inicio de sesión.
  * @param {Event} e Objeto de evento que representa el envío del formulario.
  * @return {Promise} Promesa que se resuelve con los datos del usuario logueado o se rechaza con un error.
  */
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    /**
     * FETCH
     * Enviar los datos del formulario para registrar un nuevo usuario.
     * @url {string} `${VITE_BACKEND_URL}/create/user` - URL de la API para registrar usuarios.
     * @method {POST} - Método HTTP para crear recursos.
     * @params {FormData} formData - Objeto FormData que contiene los datos del formulario.
        * @param {string} formData.nombre - Nombre del usuario.
        * @param {string} formData.clave - Clave del usuario.
        * @param {File} formData.imagen_usuario - Archivo de imagen que representa al usuario.
        * @param {string} formData.descripcion - Descripción del usuario.
     * @return {Promise} Promesa que se resuelve con un mensaje de éxito o error.
     */

    fetch(`${VITE_BACKEND_URL}/create/user`, {
      method: 'POST',
      body: formData
    })

    .then(response => response.json())

    .then(data => {
      if (data.status === 'ok') {
        alert ("¡Usuario registrado con éxito!")
        setConfirmationMessage(prevState => ({ ...prevState, message: '¡Usuario registrado con éxito! Ya puedes iniciar sesión' }));
        e.target.reset();
      } else {
        alert ("¡Prueba con otras credenciales!")
        setConfirmationMessage(prevState => ({ ...prevState, message: '¡Prueba con otras credenciales!' }));
      } 
    })

    .catch(error => {
      console.error('Error:', error);
      setConfirmationMessage(prevState => ({ ...prevState, message: 'Error al comunicarse con el servidor. Inténtalo más tarde.' }));
    });
  };

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

  return (
    <>
      {confirmationMessage.message && 
      <h1 className="confirmation-message">{confirmationMessage.message}</h1>}

      <form onSubmit={handleSubmit} className="register-form-container">
        <label>Nombre del usuario</label>
        <input
          type="text"
          className="input-control"
          name="nombre"
          placeholder="Introduce tu nombre"
          required 
          autoComplete="nombre"
        /><br />

        <label>Contraseña</label>
        <input
          type="password"
          className="input-control"
          name="clave"
          placeholder="Crea una contraseña"
          required 
          autoComplete="current-password"
        /><br />

        <label>Añade una imagen que te represente</label><br />
        <input className='file-input-style '
         type="file" 
         name="imagen_usuario"
         required 
         onChange={handleFileChange}
        /><br />
          
        <label>Descripción</label>
        <textarea
          className="input-control"
          name="descripcion"
          placeholder="Cuéntanos sobre ti, ¿Cuáles son tus sabores favoritos?"
          required 
        /><br />

        <input type="submit" value="¡Registrarse!" className="register-btn" />
      </form>
    </>
  );
};

export default RegisterForm;
