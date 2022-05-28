import { Link } from 'react-router-dom';
import s from "../../../src/Global.module.css";
import a from "./product.module.css";

function Product(props) {
  const { products } = props;

  return (
    <div style={{  border:'10px solid #f1f1f1' }}>
      <div style={{display:'flex',flexDirection:"column"}}>
        <Link to={`/products/${products.id}`} >
          <img src={products.image} alt={products.name} width="200px" height="200px" />
          
        </Link>

        <Link to={`/products/${products.id}`} >
          
        </Link>
        <h4 >{products.name}</h4>
        <button >Add to 🛒</button>
      </div>
    
     
    </div>
  );
}
export default Product;
