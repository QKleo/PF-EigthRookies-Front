import React, { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import style from './NavBar.module.css';
import logo from '../../assets/8Rookies.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';


export default function NavBar() {
  const cart = useSelector((state) => state.cart)

  const { loginWithRedirect, isAuthenticated, user } = useAuth0();


  return (
    <nav className={style.container}>
      <Link to={'/'}><img className={style.logo} src={logo} alt="The rookies" /></Link>
      <SearchBox />
      <Link className={style.link} to="/">
          <h3>Home</h3>
        </Link>

        <Link className={style.link} to="/search">
          <h3>Products</h3>
        </Link>
      {isAuthenticated ? (
        <div className={style.containerAuth}>
          <>
          <>
            <Link className={style.link} to="/admin/products">Agregar Producto</Link>
          </>
     
            <Link className={style.link} to="/login">
              <div className={style.login}>
                <img
                  className={style.imgUser}
                  src={user.picture}
                  alt="img user"
                />
                <h4>Hola {user.given_name}</h4>
              </div>
            </Link>
          </>
        </div>
      ) : (
        
          <button className={style.btnLogin} onClick={loginWithRedirect}><h3>Login</h3></button>

      )}
       <Link to='/products/carrito' className={style.containerCart}>
      <i ><AiOutlineShoppingCart style={{ fontSize: '50px', color: 'white', marginTop: "10px"}}/></i>
      {cart.length >= 1 && 
          <>
          <h4 className={style.numberProducts}>{cart.length}</h4>
          </>
          }
      </Link>
   
    </nav>
  );
}
