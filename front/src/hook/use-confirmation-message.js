import { useState } from 'react';

/**
 * Hook personalizado useConfirmationMessage
 * @hooks {useState)
 * 
 * Este hook sirve para mostrar un mensaje de confirmación durante 8 segundos una vez el usuario envia el formulario, y se confirma o no si esta bien registrado.
 * 
 * @param {string} message El mensaje que se mostrará en la confirmación.
 * @returns {array} Un array con dos elementos:
 *  - El primer elemento es un string que contiene el mensaje de confirmación actual.
 *  - El segundo elemento es una función llamada showMessage que se usa para mostrar el mensaje de confirmación.
 */

const useConfirmationMessage = () => {
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const showMessage = (message) => {
    setConfirmationMessage(message);
    setTimeout(() => {
      setConfirmationMessage('');
    }, 8000); // Ocultar el mensaje después de 8 segundos
  };

  return [confirmationMessage, showMessage];
};

export default useConfirmationMessage;
