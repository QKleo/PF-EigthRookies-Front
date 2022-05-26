import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './login.css';

const LoginAuth0 = () => {

    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

    return (

        <div className='container-index'>
            {
            isAuthenticated
            ? <div className="container-LoginAuth0">
                <img src={user.picture} alt={user.name}/>
                <h1>Hola {user.name}</h1>
                <p>{user.email}</p>
                <button className='register-btn' onClick={logout} >Salir</button>
            </div>
            : <div className="container-LoginAuth0">
                <div className="title-Auth0">
                    Registrarme con Google o Facebook
                </div>
                <button className='register-btn' onClick={loginWithRedirect} >Registrarme</button>
            </div>
            }
        </div>
    );
};

export default LoginAuth0;
