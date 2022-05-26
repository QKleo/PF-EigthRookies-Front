import { useEffect, useReducer} from 'react';
import axios from 'axios';
import React from 'react';
import Product from '../components/Product.jsx';

// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'AXIOS_REQUEST':
      return { ...state, loading: true };
    case 'AXIOS_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'AXIOS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ products }, dispatch] = useReducer((reducer), {
    products: [],
   
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const axiosData = async () => {
      dispatch({ type: 'AXIOS_REQUEST' });
      try {
        const result = await axios.get('http://localhost:3001/products');
        dispatch({ type: 'AXIOS_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'AXIOS_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };
    axiosData();
  }, []);

  console.log(products[0]);
  
  
   return (
    <div>
      
    <h1>The rookies</h1>
    
      <h1>Products</h1>
      <div className="products">
   
          <div>
            {products && products.map((product) => (
              <div key={product.slug} >
                <Product products={product}></Product>
              </div>
            ))}
          </div>
    
      </div>
    </div>
  );
}
export default HomeScreen;