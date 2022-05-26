import { Link } from 'react-router-dom';

function Product(props) {
  const { products } = props;
console.log(props);

  return (
    <div>
      <Link to={`/products/${products.id}`}>
        <img src={products.image} alt={products.name} />
      </Link>
      <div>
        <Link to={`/products/${products.id}`}>
          <div>{products.name}</div>
        </Link>
     
      </div>
    </div>
  );
}
export default Product;