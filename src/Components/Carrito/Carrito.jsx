import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import s from "../Home/home.module.css";
import {clearCart, deleteOrder, getOrder, postOrder} from "../../Redux/actionsCarrito";
import { useEffect } from "react";
import { messageSuccess } from "../Herramientas/MessageBox";
import { useAuth0 } from '@auth0/auth0-react';

export default function Carrito() {
  const inCart = useSelector((state) => state.inCart);
  const dispatch = useDispatch()
  const {isAuthenticated} = useAuth0();

  if(isAuthenticated){
    var cart = inCart
  } else {
    const cartStorage = localStorage.getItem("cartItems");
    const parsedCart = JSON.parse(cartStorage);
    var cart = parsedCart
  };

  console.log(cart)
  const handleOnClick = () => {
  messageSuccess("Order paid and sent!")
    }

  const handleOnRemove = () => {
    if(isAuthenticated){
      cart?.map((e) => {
        dispatch(deleteOrder(e.orders[0].id))
      })
    } else {
      dispatch(clearCart())
    };
  }

  useEffect(() => {
    if(isAuthenticated){
    dispatch(getOrder({ status: 'inCart' }))
    }
  }, [dispatch]);

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
      {(cart && !cart.error) ?
      <>
      <div className={s.grid}>
      {cart?.map((e) => (
          <Product products={e} key={e.id}/>
      ))}
      </div>
      <button className={s.btnvolver} onClick={() => handleOnClick()}>
      {"Pay & Order"}
      </button>
      </>
       : 
        <h2>Cart is empty</h2>
      
      }
    </div>
    
  );
}
