import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import style from './NavBar.module.css';
import logo from '../../assets/8Rookies.png';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';



export default function NavBar(props) {
  const { inCart } = props;
  const userActive = useSelector((state) => state.userActive)

  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  const handleOnClick = () => {
    loginWithRedirect();
  }
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
            {userActive.length>0&&userActive[0].user.functions==='admin'?
              <Link className={style.link} to="/admin/controlpanel">Control Panel</Link>
            :<Link className={style.link} to="/edit/profile">Edit your Profile</Link>
            
          }
          
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
        
          <button className={style.btnLogin} onClick={handleOnClick}><h3>Login</h3></button>

      )}
       <Link to='/products/carrito' className={style.containerCart}>
      <i ><AiOutlineShoppingCart style={{ fontSize: '50px', color: 'white', marginTop: "10px"}}/></i>
      {inCart?.length >= 1 && 
          <>
          <h4 className={style.numberProducts}>{inCart?.length}</h4>
          </>
          }
      </Link>
   
    </nav>
  );
}
