import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "../../Global.module.css";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "../../Redux/actionsCarrito";
import { axiosDataId } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { messageSuccess } from "../Herramientas/MessageBox";
import { AiOutlineShoppingCart} from "react-icons/ai";


export default function ProductDetail() {
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const product = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(axiosDataId(id));
  }, [id, dispatch]);

  const updateCartHandler = (product) => {
    // checkeo el stock y luego
    dispatch(addToCart(product));
    messageSuccess("Product added to cart");
  };

  return loading ? (
    <>
      <p> Calling to the rookies...</p>
    </>
  ) : error ? (
    <>
      <p> {error}</p>
    </>
  ) : (
    <div className={s.productContainer}>
      <h1>{product?.name}</h1>

      <div className={s.imgproducts}>
        <div className={s.leftproducts}>
          <img
            style={{ border: "2px solid black", borderRadius: "10px" }}
            src={product.image}
            width="65"
            height="60"
            alt="products"
          />
          <img
            style={{ border: "2px solid black", borderRadius: "10px" }}
            src={product.image}
            width="66"
            height="60"
            
          />
          <img
            style={{ border: "2px solid black", borderRadius: "10px" }}
            src={product.image}
            width="65"
            height="60"
            alt="products"
          />
        </div>

        <div>
          {/* <h1>{product?.name}</h1> */}
          <img src={product.image} width="450px" height="400px" alt="" />
        </div>
      </div>
      <div className={s.categories}>{product?.category}</div>
      <div className={s.description}>{product.description}</div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h2 style={{ color: "black" }}> $ {product.price}</h2>
        <button
          className={s.btnLand}
          onClick={() => updateCartHandler(product)}
        >
          {" "}
          <AiOutlineShoppingCart className={s.cartLogo} />
        </button>
      </div>
    </div>
  );
}
