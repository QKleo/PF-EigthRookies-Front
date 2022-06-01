import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import style from './NavBar.module.css';
import logo from '../../assets/8Rookies.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AiOutlineShoppingCart } from 'react-icons/ai';


export default function NavBar() {

  const { isAuthenticated, user } = useAuth0();


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
        
        <Link className={style.link} to="/login">
          <h3>Login</h3>
        </Link>
      )}
       <Link to='/products/carrito'>
      <i ><AiOutlineShoppingCart style={{ fontSize: '50px', color: 'white'}}/></i>
      </Link>
    </nav>
  );
}
