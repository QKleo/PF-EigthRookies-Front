import { Link } from 'react-router-dom';
import s from "../../../src/Global.module.css";
import a from "./product.module.css";
import { AiOutlineShoppingCart } from 'react-icons/ai';


export default function Product(props) {
  const { products } = props;

  return (
    // <div className={a.contenedorrr}>
    //   <div>
    //     <Link to={`/products/${products.id}`} className={s.link}>
    //       <img src={products.image} alt={products.name} width="120px" height="120px" />
    //     </Link>

    //     <Link to={`/products/${products.id}`} className={s.link}>
    //       <h4 className={s.yaya}>{products.name}</h4>
    //     </Link>

    //   </div>
    //   <div>
    //     <button className={s.rere}>Add to 🛒</button>
    //   </div>

    // </div>

      <div style={{  border:'10px solid #f1f1f1' }}>
              <div style={{display:'flex',flexDirection:"column"}}>
                <Link to={`/products/${products.id}`} >
              <img src={products.image} alt={products.name} width="200px" height="200px" />
    
              </Link>

              <Link to={`/products/${products.id}`} >
    
              </Link>
              <h4 >{products.name}</h4>
                  <button className={s.basicBtn} >Add to <AiOutlineShoppingCart style={{ color: 'white', fontSize: '20px', marginTop:'7px'}} /></button>
              </div>


      </div> 


  );
}
//export default Product;
