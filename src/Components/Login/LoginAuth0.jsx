import React, {useMemo} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./login.css";
import s from "../../Global.module.css";
import { useSelector } from "react-redux";
import { getError } from "../Herramientas/utils";
import axios from "axios";



export default function LoginAuth0(){



const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

const cart=useSelector((state)=>state.cart)


useMemo(() => {
    if(cart){
    dispatch(postOrder(cart))}
    localStorage.removeItem("cartItems");
    navigate("/");
    }
)
  return (
    <div className={s.login}>
      <div className={s.loginContainer}>
        <img
          src="https://hotmart.com/media/2019/09/670x419-O-que-e-Landing-Page-e-como-criar-uma.webp"
          width="750px"
          height="800px"
          alt=""
        />
      </div>
      <div className={s.loginContainer}>
        {isAuthenticated ? (
          <div className="container-LoginAuth0">
            <img src={user.picture} alt={user.name} />
            <h1>Hola {user.name}</h1>
            <h4>{user.email}</h4>
            <button className={s.basicBtn} onClick={logout}>
              Salir
            </button>
          </div>
        ) : (
          <div className="container-LoginAuth0">
            <h1>Login to your account or Sign in</h1>
            <button className={s.basicBtn} onClick={loginWithRedirect}>
              Login / Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


