import React from "react";
import PostreAccordion from "@/components/PostreAccordion";
import { VITE_BACKEND_URL } from '@/consts/consts';
import "./postre-lightbox-styles.css";

/**
 * Componente para el lightbox de detalles de un postre.
 * @param {Boolean} isOpen Estado que indica si el lightbox está abierto o no.
 * @param {Function} onClose Función para cerrar el lightbox.
 * @param {Object} postre Objeto que contiene los detalles del postre a mostrar en el lightbox.
 */

const PostreLightbox = ({ isOpen, onClose, postre, children }) => {
  
  /**
  * toggleLightBox
  * Función que alterna la visibilidad del LightBox.
  */
  const toggleLightBox = () => {
    onClose();
  };

  const { nombre, imagen } = postre;

  return (
    <>
    <section>
      {isOpen && (
        <div className="lightbox-container">
          <div className="lightbox-backdrop">
          </div>

          <div className="lightbox-content">
            <button className="lightbox-close" onClick={toggleLightBox}>
              X
            </button>
            <h2>{nombre}</h2>
            <img src={`${VITE_BACKEND_URL}/files/${imagen}`} alt={nombre} className="lightbox-image" />
            <div>
              <PostreAccordion {...postre} >
                {children}
              </PostreAccordion>
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default PostreLightbox;