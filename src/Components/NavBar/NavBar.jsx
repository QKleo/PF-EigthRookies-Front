import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import style from './NavBar.module.css';
import logo from '../../assets/8Rookies.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


export default function NavBar() {

  const { isAuthenticated, user } = useAuth0();


  return (
    <nav className={style.container}>
      <Link to={'/'}><img className={style.logo} src={logo} alt="The rookies" /></Link>
      <SearchBox />
      {isAuthenticated ? (
        <div className={style.containerAuth}>
          <>
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
          <>
            <Link className={style.link} to="/admin/products">Crear Productos</Link>
          </>
        </div>
      ) : (
        <Link className={style.link} to="/login">
          <p>Login</p>
        </Link>
      )}
      <p>Link al carrito</p>
    </nav>
  );
}
