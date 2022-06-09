import React from 'react';
import { Link } from "react-router-dom";
import s from "../../../src/Global.module.css";
import a from "./product.module.css";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { messageSuccess } from "../Herramientas/MessageBox";
import {
  addToCart,
  getOrder,
  postOrder,
  removeFromCart,
  putOrder
} from "../../Redux/actionsCarrito";
import { useAuth0 } from '@auth0/auth0-react';

export default function Product(props) {
  const {isAuthenticated} = useAuth0();
 
  const dispatch=useDispatch()
  const { products } = props;

  const updateCartHandler = async (products) => {      
    // checkeo el stock y luego
    if(isAuthenticated){
      await dispatch(postOrder({...products, amount: products.quantity, productId: products.id, status: "inCart"}))
      dispatch(getOrder({ status: 'inCart' }))
    } else {
      dispatch(addToCart(products))
    }
    messageSuccess(`${products.name}  added to cart`)
  }

  const reduceHandler = async (products) => {      
    // checkeo el stock y luego
    if(isAuthenticated){
      await dispatch(putOrder({
        amount: -1,
        productId: products.id,
        status: "inCart"})
        )
      dispatch(getOrder({ status: 'inCart' }))
    } else {
      dispatch(removeFromCart(products))
    }
    messageSuccess(`${products.name}  removed from cart`)
  }
  
  return (
    <div className={a.cardContainer}>
         <div style={{ marginTop: "20px", alignItems: "center" }}>
        <Link to={`/products/${products.id}`}>
          <img
            src={products.image}
            alt={products.name}
            width="300px"
            height="300px"
          />
        </Link>
      </div>

      <Link to={`/products/${products.id}`}>
        <h4 style={{ textAlign: "center", color: "black" }}>
          {products.name.replace(/[#-]/g, " ")}
        </h4>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <h4 className={a.price}>${products.price}</h4>
          <button className={s.btnLand} onClick={() => updateCartHandler(products)}>
            <AiOutlineShoppingCart className={s.cartLogo} />
          </button>
          
          {(products.quantity >= 1 || products.orders) && 
          <>
          <h4 className={a.price}>{products.quantity || products.orders[0].amount}</h4>
          <button className={s.sacarBtn} onClick={() => reduceHandler(products)}>
          {"-"}
          </button>
          </>
          }

        
          
          
        </div>
      
    </div>
  )
}
