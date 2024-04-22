import React from 'react';
import { useContext } from 'react'; 
import { AuthContext } from '@/pages/Context/AuthContext';
import { AdminContext } from '@/pages/Context/AdminContext';
import { UsuarioContext } from '@/pages/Context/UsuarioContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons'; 
import { VITE_BACKEND_URL } from '@/consts/consts';
import './home-styles.css'; 

/**
 * Componente para la pantalla de bienvenida.
 * @hook {useContext} Hook para acceder al contexto de usuario, autentificación y administrador.
 */

function Home() {
  const { isLogged } = useContext(AuthContext); 
  const { isAdmin } = useContext(AdminContext); 
  const { datosUsuario } = useContext(UsuarioContext); 

  return (
    <>
      <main className="container">
          <section className="welcome-section">
            <div className="hero-content">
              <h1 className="title">Bienvenido al Recetario de Postres de Mundo de Azúcar</h1>
    
              {(isLogged && !isAdmin) &&
                <h2 className="galada-font">¡Explora las deliciosas recetas y conviértete en un maestro de los postres!</h2>
              }
  
              {!isLogged  &&
                <p>Pincha en acceder para registrarte o iniciar sesión y comenzar a añadir recetas</p>
              }
  
              {isLogged  &&
                <p className='nombre-usuario'>¡Hola {datosUsuario.nombre}!</p>
              }
  
              { isLogged  &&
                <img className='imagen-usuario' src={`${VITE_BACKEND_URL}/files/${datosUsuario.imagen}`} alt={datosUsuario.nombre} />
              }
            </div>
          </section>
              
          {(isLogged && !isAdmin) &&
            <section className="info-section">
              <h2 className="galada-font">¿Qué puedes hacer en nuestro Recetario?</h2>
              <ul>
                <li><FontAwesomeIcon icon={faBirthdayCake}/> Agrega tus propias recetas, ¡todas juntas en un mismo sitio!</li> 
                <li><FontAwesomeIcon icon={faBirthdayCake}/> Edita las recetas según tus preferencias</li> 
                <li><FontAwesomeIcon icon={faBirthdayCake}/> Borra las recetas que ya no te gusten </li> 
                <li><FontAwesomeIcon icon={faBirthdayCake}/> ¡Accede a tus recetas cuando quieras y mejora en el mundo de la repostería!</li> 
              </ul>
            </section>
          }

          {(isLogged && !isAdmin) &&
            <section className="go-section">
              <p className="galada-font">¡Deseamos que llenes tu recetario de deliciosos postres!</p>
            </section>
          }

          {(isLogged && isAdmin) &&
            <section className="go-section">
              <p className="galada-font">Pulsa en administrar para gestionar los usuarios que usan la web</p>
            </section>
          }

      </main>
    </> 
  );
}

export default Home;
