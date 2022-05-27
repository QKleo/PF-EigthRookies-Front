import { Link } from 'react-router-dom';
import s from "../Global.module.css"

function Product(props) {
  const { products } = props;
console.log(props);

  return (
    <div>
      <Link to={`/products/${products.id}`} className={s.link}>
        <img src={products.image} alt={products.name} />
      </Link>
      <div>
        <Link to={`/products/${products.id}`} className={s.link}>
          <h4>{products.name}</h4>
        </Link>
     
      </div>
    </div>
  );
}
export default Product;