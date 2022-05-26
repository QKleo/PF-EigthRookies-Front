import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import style from './NavBar.module.css';
import logo from '../../assets/8Rookies.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import s from "../../Global.module.css"


export default function NavBar() {

    const { isAuthenticated, user } = useAuth0();


    return (
        <nav className={style.container}>
            <img className={style.logo} src={logo} alt="The rookies" />
            <SearchBox />
            {isAuthenticated
                ? <Link className={style.link} to='/login'>
                    <div className={style.login} >
                        <img className={style.imgUser} src={user.picture} alt='img user' />
                        <h4>Hola {user.given_name}</h4>
                    </div>
                </Link>
                : <Link to='/login' className={s.loginBtn}><>Login</> </Link>
            }
            <h2>🛒</h2>
        </nav>
    );
}
