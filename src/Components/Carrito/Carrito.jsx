import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import s from "../Home/home.module.css";
import {clearCart} from "../../Redux/actionsCarrito";

export default function Carrito() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  console.log("soyCartItem", cart);

  return (
    <div className={s.boxcarrito}>
      <div className={s.buttonContainer}>
      <Link to="/search">
        <button className={s.btnvolver}>Volver</button>
      </Link>
      <button  className={s.vaciarCarrito} onClick={() => dispatch(clearCart())}>
          {" "}
          Clear Cart 🛒
        </button>
      </div>
      {/* <h4>{Carrito.length}</h4> */}

      <div className={s.grid}>
              {cart?.map((product) => (
               
                  <Product products={product} key={product.id}/>
              
              ))}
            </div>
      <button className={s.btnvolver}>
        {"Pay & Order"}
      </button>
    </div>
  );
}
