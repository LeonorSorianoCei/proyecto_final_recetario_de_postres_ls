import React from 'react'; 
import { Routes, Route } from 'react-router-dom'; 
import { Suspense } from 'react';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import PostresList from '@/pages/PostresList'; 
import PostreAdd from '@/pages/PostreAdd'; 
import Acceder from '@/pages/Acceder';
import Layout from '@/pages/Layout';
import '@/App.css';


/*————————————————————————————————————————*\
 * App.jsx
 *  Hooks: 
 *    — useState, useEffect, useConfirmationMessage
 *  Datos:
 *    — API fetch a http://localhost:8080/API/v1
 *  Estructura:
 *    — LazyAdmin (Cargando... durante 3 segundos)
 *    — Layout
 *     — Home
 *     — PostresList
 *     — PostreAdd
 *    — Acceder 
 *    — NotFound
 *  ————————————————————————————————————————*/



/**
 * React-router
 * 
 * @route {/} Cargamos el componente <Layout />
 * @route {/lista} Cargamos el componente <PostresList />
 * @route {/agregar} Cargamos el componente <PostreAdd />
 * @route {/login} Cargamos el componente <Acceder />
 * @route {/lista} Cargamos el componente <PostresList />
 * @route {/admin} Cargamos el componente <LazyAdmin />
 * 
 *  */


 /**
 * delay
 * Función para simular un retraso en la ejecución de código asíncrono.
 * @param {number} ms Número de milisegundos que se debe esperar.
 * @return {Promise} Promesa que se resuelve después del tiempo especificado.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const LazyAdmin = React.lazy(async () => {
  await delay(3000); 
  return import('@/components/UsersList');
});

function App() {
  return (
    <>
        <Suspense fallback={<h1 className='cargando'>Cargando...</h1>}>
              <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/lista" element={<PostresList />} /> 
                    <Route path="/agregar" element={<PostreAdd />} /> 
                    <Route path="/login" element={<Acceder />} />
                    <Route path="/admin" element={<LazyAdmin />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
              </Routes>
        </Suspense>
    </>
  );
}

export default App;
