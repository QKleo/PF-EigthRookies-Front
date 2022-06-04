import React from 'react';
import { Link } from "react-router-dom";
import s from "../../../src/Global.module.css";
import a from "./product.module.css";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from "../../Redux/actionsCarrito";
import { messageSuccess } from "../Herramientas/MessageBox";





export default function Product(props) {
 
  const dispatch=useDispatch()
  const { products } = props;


  const updateCartHandler = (products) => {      
    // checkeo el stock y luego
    dispatch(addToCart(products))
    messageSuccess("Product added to cart")
    }
    
  return (
   
    <div className={a.cardContainer}>

      <div style={{ marginTop: "20px", alignItems:'center'}}>
        <Link to={`/products/${products.id}`}>
          <img
            src={products.image}
            alt={products.name}
            width="200px"
            height="200px"
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
          
          {products.quantity >= 1 && 
          <>
          <h4 className={a.price}>{products.quantity}</h4>
          <button className={s.sacarBtn} onClick={() => dispatch(removeFromCart(products))}>
          {"-"}
          </button>
          </>
          }

        
          
          
        </div>
      </div>
   
  )
}