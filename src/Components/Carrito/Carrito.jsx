import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import s from "../Home/home.module.css";
import {clearCart, deleteOrder, postAllOrders} from "../../Redux/actionsCarrito";
import { messageError } from "../Herramientas/MessageBox";
import { useAuth0 } from '@auth0/auth0-react';

export default function Carrito() {
  const navigate = useNavigate
  const inCart = useSelector((state) => state.inCart);
  const userInfo = useSelector((state) => state.userActive);
  const address = userInfo?.address || ""
  const dispatch = useDispatch()
  const {isAuthenticated, loginWithRedirect} = useAuth0();

  console.log(inCart)
  const handleOnClick = () => {
    if (isAuthenticated) {
      if (address && address.length) {
        const ordersIds = inCart.map((e) => e.orders[0].id);
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
      inCart?.map((e) => {
        return dispatch(deleteOrder(e.orders[0].id))
      })
    } else {
      dispatch(clearCart())
    };
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
          Address: <input style={{width: "40vw"}}></input>
        </h1> : 
        <></>}
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
