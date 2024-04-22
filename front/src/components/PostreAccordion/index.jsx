import React, { useState } from "react";


/**
 * Componente de acordeón para mostrar información del postre.
 * @param {String} ingredientes Ingredientes del postre.
 * @param {String} instrucciones Instrucciones para preparar el postre.
 * @param {Function} toggleAccordion Función para alternar los elementos del acordeon.
 * @param {JSX.Element} children Componente de formulario para modificar el postre.
 */

const PostreAccordion = ({ ingredientes, instrucciones, children }) => {
  const [activeItem, setActiveItem] = useState(null);

  /**
  * toggleAccordion
  * Función que alterna la visibilidad de un elemento de acordeón específico.
  * @param {number} itemId Identificador único del elemento de acordeón que se quiere alternar.
  */
  const toggleAccordion = (itemId) => {
    setActiveItem((prevItem) => (prevItem === itemId ? null : itemId));
  };

  return (
    <>
      <section>
            <div>
              <button onClick={() => toggleAccordion("ingredientes")}>
                Ingredientes
              </button>
              {activeItem === "ingredientes" && (
                <div>
                  <p>{ingredientes}</p>
                </div>
              )}
            </div>
            
            <div>
              <button onClick={() => toggleAccordion("instrucciones")}>
                Instrucciones
              </button>
              {activeItem === "instrucciones" && (
                <div>
                  <p>{instrucciones}</p>
                </div>
              )}
            </div>
            
            <div>
              <button onClick={() => toggleAccordion("modificar")}>
                Modificar Postre
              </button>
              {activeItem === "modificar" && (
                <div>
                  {children}
                </div>
              )}
            </div>
      </section>
    </>
  );
};

export default PostreAccordion;
