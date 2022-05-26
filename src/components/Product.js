import { Link } from 'react-router-dom';

function Product(props) {
  const { product } = props;


  return (
    <div>
      <Link to={`http://localhost:3001/products`}>
        <img src={product.img} alt={product.name} />
      </Link>
      <div>
        <Link to={`http://localhost:3001/products`}>
          <div>{product.name}</div>
        </Link>
        {product.countInStock === 0 ? (
          <button variant="light" disabled>
            Out of stock
          </button>
        ) : (
          <button>Add to cart</button>
        )}
      </div>
    </div>
  );
}
export default Product;