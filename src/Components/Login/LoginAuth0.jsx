import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import FormUser from '../Users/FormUser'
import HistoryPurchase from '../HistoryView/HistoryPurchase';
import './login.css';


export default function LoginAuth0() {
  const { user, logout} = useAuth0();


  return (
    <div className='container-index'>

      <div className="container-LoginAuth0">
        <img src={user?.picture} alt={user?.name} />
        <h2 className='title'>Hello {user?.name}</h2>
        <p>Here you have all your personal information...</p>
        <h4>{user?.email}</h4>
        <button className='btnLogout' onClick={logout} >Cerrar sesión</button>
      </div>
      
      <div className="container-LoginAuth0">
        <FormUser />
      </div>

      <div className="container-LoginAuth0">
        <HistoryPurchase />
      </div>

    </div>
  );
};
