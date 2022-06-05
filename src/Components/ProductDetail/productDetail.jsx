import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "../../Global.module.css";
import { addToCart, clearCart, removeFromCart } from "../../Redux/actionsCarrito";
import { axiosDataId } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

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
      <img src={product.image} width="300px" height="300px" alt="" />
      <div className={s.categories}>
        {product?.category}
      </div>
      <div className={s.description}>{product.description}</div>
      <button className={s.basicBtn} onClick={() => updateCartHandler(product)}>
        {" "}
        $ {product.price} 🛒
      </button>
    </div>
  );
}
