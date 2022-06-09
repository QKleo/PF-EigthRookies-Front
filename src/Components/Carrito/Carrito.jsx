import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import s from "../Home/home.module.css";
import {clearCart, deleteOrder, getOrder, postAllOrders, postOrder} from "../../Redux/actionsCarrito";
import { useEffect } from "react";
import { messageError } from "../Herramientas/MessageBox";
import { useAuth0 } from '@auth0/auth0-react';

export default function Carrito() {
  const navigate = useNavigate
  const inCart = useSelector((state) => state.inCart);
  const userInfo = useSelector((state) => state.userInfo);
  const address = userInfo?.address || ""
  const dispatch = useDispatch()
  const {isAuthenticated, loginWithRedirect} = useAuth0();

  if(isAuthenticated){
    var cart = inCart
  } else {
    const cartStorage = localStorage.getItem("cartItems");
    const parsedCart = JSON.parse(cartStorage);
    var cart = parsedCart
  };

  console.log(cart)
  const handleOnClick = () => {
    if (isAuthenticated) {
      if (address && address.length) {
        const ordersIds = cart.map((e) => e.orders[0].id);
        dispatch(postAllOrders({ orderIds: ordersIds }));
        setTimeout(() => {
          navigate('/purchase');
        }, 1000);
      } else {
      return messageError("Addres is required")
      }
    }
  return loginWithRedirect();
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
   
        <h1 style={{display: "flex"}}>
          Address: <input style={{width: "40vw"}}></input>
        </h1>
      <button className={s.btnvolver} onClick={() => handleOnClick()}>
      {"Checkout"}
      </button>

      
      </>
       : 
        <h2>Cart is empty</h2>
      
      }
    </div>
    
  );
}
