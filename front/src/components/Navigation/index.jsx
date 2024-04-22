import { Link } from "react-router-dom";
import { useState, useContext } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "@/pages/Context/AuthContext";
import { AdminContext } from "@/pages/Context/AdminContext";
import './navigation-styles.css';

/**
 * Componente para la barra de navegación.
 * @component
 * @param {Function} toggleMenu Función para alternar la visibilidad del menú.
 * @param {Function} closeMenu Función para cerrar el menú.
 * @hook {useContext} Hook para acceder al contexto de autenticación y administrador.
 */

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged } = useContext(AuthContext); 
  const { isAdmin } = useContext(AdminContext); 

   /**
   * toggleMenu
   * Función para alternar la visibilidad del menú.
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

   /**
   * closeMenu
   * Función para cerrar el menú.
   */
  const closeMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="Header">
        <img src="/logo_mundo_de_azucar.png" alt="Logotipo mundo de azucar" className="Logo" />
        <nav className={`Header-nav ${isOpen ? "isVisible" : ""}`} >
          <ul className="Header-ul">
            {(isLogged || !isLogged) &&
              <li>
                <Link to="/" onClick={closeMenu}>
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </li>
            }
            {!isLogged &&
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Acceder
                </Link>
              </li>
            }
            {(isLogged && !isAdmin) &&
              <>
                <li>
                  <Link to="/lista" onClick={closeMenu}>
                    Recetas
                  </Link>
                </li>
                <li>
                  <Link to="/agregar" onClick={closeMenu}>
                    Agregar
                  </Link>
                </li>
              </>
            }
            {(isLogged && isAdmin) &&
              <li>
                <Link to="/admin" onClick={closeMenu}>
                  Administrar
                </Link>
              </li>
            }
          </ul>
        </nav>
        <button onClick={toggleMenu} className='Header-btn'>
          <FontAwesomeIcon icon={faBars} className="Menu-icon" />
        </button>
      </header>
    </>
  )
}

export default Navigation;