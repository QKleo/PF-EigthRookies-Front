import { Link } from "react-router-dom";
import s from "../../../src/Global.module.css";
import a from "./product.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch} from "react-redux";

import {
  addToCart,
  clearCart,
  removeFromCart,
} from "../../Redux/actionsCarrito";
import { useEffect, useState } from "react";

export default function Product(props) {
  const dispatch = useDispatch();
 
  const { products } = props;
 
  const updateCartHandler = (product) => {
    // checkeo el stock y luego
    dispatch(addToCart(product));
  };

  
  return (
    <div className={a.cardContainer}>
         <div style={{ marginTop: "20px", alignItems: "center" }}>
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
        <button
          className={s.btnLand}
          onClick={() => updateCartHandler(products)}
        >
          <AiOutlineShoppingCart
            style={{ color: "white", fontSize: "20px", marginTop: "7px" }}
          />
        </button>
        {/* <button className={s.btnLand}>
            <AiOutlineShoppingCart
              style={{ color: "white", fontSize: "20px", marginTop: "7px" }}
            />
          </button> */}
        <button onClick={() => dispatch(removeFromCart(products))}>
          {" "}
          Remove from Cart 🛒
        </button>
        <button onClick={() => dispatch(clearCart())}> Clear Cart 🛒</button>
      </div>
    </div>
  );
}
