import { Link } from 'react-router-dom';

function Product(props) {
  const { products } = props;
console.log(props);

  return (
    <div>
      <Link to={`http://localhost:3001/products`}>
        <img src={products.image} alt={products.name} />
      </Link>
      <div>
        <Link to={`http://localhost:3001/products`}>
          <div>{products.name}</div>
        </Link>
     
      </div>
    </div>
  );
}
export default Product;