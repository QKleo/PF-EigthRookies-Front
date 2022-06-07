import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './login.css';

export default function LoginAuth0() {

  const { user, logout } = useAuth0();

  // useMemo(() => {
  //   const cart = window.localStorage.getItem("cartItems");
  //   if(cart){
  //     var parsedCart = JSON.parse(cart);
  //     parsedCart.map((el) => 
  //       dispatch(postOrder(el))
  //     );
  //     localStorage.removeItem("cartItems")
  //     }
  //   navigate("/");
  //   }
  // ,[user])
  return (
    <div className='container-index'>
      <div className="container-LoginAuth0">
        <img src={user.picture} alt={user.name} />
        <h1 className='title-Auth0'>Hola {user.name}</h1>
        <h4>{user.email}</h4>
        <button className='btnLogout' onClick={logout} >Cerrar sesión</button>
      </div>
    </div>
  );
};
