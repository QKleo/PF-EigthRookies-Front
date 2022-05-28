import { useEffect, useReducer } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Product from '../components/Product/Product.jsx';
import React from "react";
import s from './home.module.css';
import FilterCategories from '../components/Filters/Filters.jsx';
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

    products: []
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

  const resultSearch = useSelector((state) => state.productResult);
  console.log(resultSearch.length);


  return (
    <div>
      <FilterCategories />
      <div>
        {/* <<<<<<< HEAD
          <div className={s.grid}>
            {products.map((product) => (
              <div  className={s.lala} key={product.id} >
                <Product products={product}></Product>
              </div>
            )).slice(0,7)}
          </div>
======= */}


        {resultSearch.length
          ? <div className={s.grid}>
            {resultSearch.map((product) => (
              <div className={s.lala} key={product.id} >
                <Product products={product}></Product>
              </div>
            ))}
          </div>
          : <div className={s.grid}>
            {products.map((product) => (
              <div className={s.lala} key={product.id} >
                <Product products={product}></Product>
              </div>
            ))}
          </div>
        }


      </div>
    </div>
  );
}
export default HomeScreen;
