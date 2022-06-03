import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../Product/Product";
import s from "../Home/home.module.css";

export default function Carrito() {
  const cart = useSelector((state) => state.cart);

  console.log("soyCartItem", cart);

  return (
    <div className={s.boxcarrito}>
      <Link to="/search">
        <button className={s.btnvolver}>Volver</button>
      </Link>

      {/* <h4>{Carrito.length}</h4> */}

      {
        <div className={s.grid}>
          {cart.length > 0 &&
            cart.map((product, i) => (
              <div key={i}>
                <Product products={product}></Product>
              </div>
            ))}
        </div>
      }
      <button className={s.btnvolver} onClick>
        {"Pay & Order"}
      </button>
    </div>
  );
}
