import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import s from "../Home/home.module.css";
import {clearCart, deleteOrder, postAllOrders} from "../../Redux/actionsCarrito";
import { messageError } from "../Herramientas/MessageBox";
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from "react";

export default function Carrito() {
  const navigate = useNavigate()
  const inCart = useSelector((state) => state.inCart);
  // const userInfo = useSelector((state) => state.userInfo);
  // const address = userInfo?.address || "";
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const {isAuthenticated, loginWithRedirect, user} = useAuth0();

 
  function handleOnClick(e){
    e.preventDefault();
    if (isAuthenticated) {
      if (address && address.length) {
        dispatch(postAllOrders({ user: user.email, address: address}));
        setTimeout(() => {
          return navigate(`/checkout`);
        }, 1000);
      } else {
      return messageError("Addres is required")
      }
    } else {
  return loginWithRedirect();}
  }


  const handleOnRemove = () => {
    if(isAuthenticated){
      inCart?.map((e) => {
        
        return dispatch(deleteOrder(e.orders[0].id))
      })
    } else {
      dispatch(clearCart())
    };
  }

  const handleChange = (e) => {
    setAddress(e.target.value)
  }

  return (
    
    <div className={s.boxcarrito}>
      <div className={s.buttonContainer}>
      <Link to="/search">
        <button className={s.btnvolver}>Volver</button>
      </Link>
      
      <button  className={s.vaciarCarrito} onClick={() => handleOnRemove()}>
          {" "}
          Clear Cart 🛒
        </button>
      </div>
      {(inCart && !inCart.error) ?
      <>
      <div className={s.grid}>
      {inCart?.map((e) => (
          <Product products={e} key={e.id}/>
      ))}
      </div>
        {isAuthenticated ?
        <h1 style={{display: "flex"}}>
          Address: <input style={{width: "40vw"}} onChange={handleChange} value={address}></input>
        </h1> : 
        <></>}
      <button className={s.btnvolver} onClick={(e) => handleOnClick(e)}>
      {"Checkout"}
      </button>

      
      </>
       : 
        <h2>Cart is empty</h2>
      
      }
    </div>
    
  );
}
