import UsersList from '@/components/UsersList';
import './admin-styles.css';

/**
 * Componente para la página de administración. 
 */

const Admin = () => {

    return (
        <>
            <section className="text">
              <h1> Accede a la lista de usuarios y borra o restaura el usuario que desees</h1>
              </section>
            <UsersList/>
        </>
    )
}

export default Admin;