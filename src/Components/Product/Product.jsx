import { Link } from 'react-router-dom';
import s from "../../../src/Global.module.css"
import a from "./product.module.css"

function Product(props) {
  const { products } = props;
console.log(props);

  return (
    <div className={a.contenedorrr}>
      
      <Link to={`/products/${products.id}`} className={s.link}>
        <img src={products.image} alt={products.name} width="120px" height="120px" />
      </Link>
    
        <Link to={`/products/${products.id}`} className={s.link}>
          <h4 className={s.yaya}>{products.name}</h4>
        </Link>

      
      
      <button className={s.rere}>Add to 🛒</button>
      

    </div>
  );
}
export default Product;