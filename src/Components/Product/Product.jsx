import { Link } from "react-router-dom";
import s from "../../../src/Global.module.css";
import a from "./product.module.css";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { agregarProductoCarrito, eliminarProductoCarrito } from '../../Redux/actions';


export default function Product(props) {
  const dispatch=useDispatch()
  const Carrito=useSelector(state=>state.Carrito)
  const { products } = props;

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
          <button className={s.btnLand} onClick={()=>
                    dispatch(agregarProductoCarrito(products))}>
                     <AiOutlineShoppingCart style={{ color: 'white', fontSize: '20px', marginTop:'7px'}} /></button>
          {/* <button className={s.btnLand}>
            <AiOutlineShoppingCart
              style={{ color: "white", fontSize: "20px", marginTop: "7px" }}
            />
          </button> */}
         {products.EstoyEnElcarro&&<button className={s.agregarbtn} onClick={()=>{
           dispatch( eliminarProductoCarrito(products,Carrito) )
         }}>Agregado!</button>}
        </div>
      </div>
   
  )
}