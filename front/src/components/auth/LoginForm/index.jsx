import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { easyFetch } from '@/helpers/utils';
import { AuthContext } from '@/pages/Context/AuthContext';
import { AdminContext } from '@/pages/Context/AdminContext';
import { UsuarioContext } from '@/pages/Context/UsuarioContext';
import { VITE_BACKEND_URL } from '@/consts/consts';
import './login-form-styles.css';

/**
 * Componente para el formulario de inicio de sesión.
 * @prop {useState} usuario Estado para almacenar el nombre de usuario.
 * @prop {useState} clave Estado para almacenar la clave del usuario.
 * @hook {useEffect} Carga el nombre de usuario almacenado en localStorage.
 * @hook {useContext} Hook para acceder al contexto de autenticación, administrador y usuario.
 * @hook {useNavigate} Hook para navegar a través de la aplicación.
 * @param {Function} handleSubmit Función para manejar el envío del formulario.
 */

function LoginForm() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navegador = useNavigate();
  const { setIsLogged } = useContext(AuthContext);
  const { setIsAdmin } = useContext(AdminContext);
  const { setDatosUsuario } = useContext(UsuarioContext);

  useEffect(() => {
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      const parsedUsuario = JSON.parse(storedUsuario);
      setUsuario(parsedUsuario.usuario);
    }
  }, []);


  /**
  * handleSubmit
  * Función que maneja el envío del formulario de inicio de sesión.
  * @param {Event} e Objeto de evento que representa el envío del formulario.
  * @return {Promise} Promesa que se resuelve con los datos del usuario logueado o se rechaza con un error.
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      /**
       * FETCH
       * Enviar los datos del formulario para iniciar sesión
       * @url {string} `${VITE_BACKEND_URL}/login/user` - URL de la API para iniciar sesión
       * @method {POST} - Método HTTP para crear recursos.
       * @params {Object} body - Objeto con los datos del formulario
       *   * @param {string} body.nombre - Nombre de usuario
       *   * @param {string} body.clave - Clave del usuario
       * @return {Promise<Object>} Promesa que se resuelve con los datos del usuario logueado o rechazada con un error
       */

      const data = await easyFetch({
        url: `${VITE_BACKEND_URL}/login/user`,
        method: 'POST',
        body: { nombre: usuario, clave: clave },
        callback: (data) => {
          if (data.usuario) {
            setIsLogged(data.usuario.isLogged);
            setIsAdmin(data.usuario.isAdmin);
            setDatosUsuario(data.usuario);
            alert("¡Sesión iniciada con éxito!");
           localStorage.setItem('usuario', JSON.stringify({ usuario }));
            navegador("/");
          }
        }
      });
    } catch (error) {
      console.error('¡Error, inténtalo de nuevo!');
      }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="register-form-container">
        <label>Nombre del usuario</label>
        <input
          type="text"
          name="nombre"
          value={usuario}
          placeholder="Ingresa tu nombre de usuario"
          onChange={(e) => setUsuario(e.target.value)}
          required
          autoComplete="nombre"
          className="input-control" 
        /><br />

        <label>Contraseña</label>
        <input
          type="password"
          name="clave"
          value={clave}
          placeholder="Ingresa tu clave"
          onChange={(e) => setClave(e.target.value)}
          required
          autoComplete="current-password"
          className="input-control" 
        /><br />

        <input type="submit" value="Iniciar sesión" className="register-btn" /> {/* Aplica la clase de estilo para el botón */}
      </form>
    </>
  );
}

export default LoginForm;