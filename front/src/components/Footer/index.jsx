import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer-styles.css'; 

/**
 * Componente Stateless para el pie de página con iconos de redes sociales.
 */

 const Footer = () => {
  return (
    <>
        <div className='footer'>
            <div className="social-icons">
                <a href="https://twitter.com" className="twitter-icon">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://facebook.com" className="facebook-icon">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://instagram.com" className="instagram-icon">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </div>
        </div>
    </>
  )
}

export default Footer;