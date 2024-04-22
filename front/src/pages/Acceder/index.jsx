import { useState } from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import LoginForm from '@/components/auth/LoginForm';
import './acceder-styles.css';

/**
 * Componente para la página de inicio de sesión y registro.
 * @hook {useState} Estado para almacenar si esta o no logueado. 
 */

const Acceder = () => {

    const [isLogged, setIsLogged] = useState(false);

    return (
        <>
            <section className='acceder-container'>
                <button className={`filtros-btn ${isLogged && 'active-filter'}`} onClick={()=>setIsLogged(true)}>Iniciar sesión</button>
                <button className={`filtros-btn ${!isLogged && 'active-filter'}`} onClick={()=>setIsLogged(false)}>Registrarse</button>
            </section>
            {isLogged ? <LoginForm/> : <RegisterForm/>}
        </>
    )
}

export default Acceder;