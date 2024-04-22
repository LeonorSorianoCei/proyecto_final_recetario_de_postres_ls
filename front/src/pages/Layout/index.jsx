import React, { useState} from "react";
import {  Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { AuthContext } from "@/pages/Context/AuthContext";
import { AdminContext } from "@/pages/Context/AdminContext";
import { PostreContext } from "@/pages/Context/PostreContext";
import { UsuarioContext } from "@/pages/Context/UsuarioContext";
import Footer from "@/components/Footer";
import './layout-styles.css'; 

/**
 * Layout y proveer los contextos a toda la app.
 * @hook {useContext} Hook para acceder al contexto de usuario, autentificación, administrador y postre.
 */

function Layout() {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState();
    const [postresList, setPostresList] = useState([]);

    return (
    <>
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
                <UsuarioContext.Provider value={{ datosUsuario, setDatosUsuario }}>
                <PostreContext.Provider value={{ postresList, setPostresList }}>
                
                    <Navigation />
                    <div className="content">
                        <Outlet />
                    </div>
                  <Footer/>
            
                    </PostreContext.Provider>
                </UsuarioContext.Provider>
            </AdminContext.Provider>
        </AuthContext.Provider>    
    </>
    );
}

export default Layout;
