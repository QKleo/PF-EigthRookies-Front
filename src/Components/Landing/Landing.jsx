import React from 'react'
import Carrusel from '../Carrusel/Carrusel'
import Product  from '../Product/Product.jsx'
import s from './landing.module.css'
import { useEffect, useReducer} from 'react';
import axios from 'axios';



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


function Landing () {
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

  ;

  const [{ products }, dispatch] = useReducer((reducer), {
    products: [],
   
  });
    
  return (
    <div>
    
    <h1>Bienvenido a The Rookies!</h1>
    <Carrusel/>
    
    <div className={s.g}>
       <div className={s.grid} >
        {products.map((product) => (
              <div  key={product.slug} >
                <Product className={s.lala} key={product.slug} products={product}></Product>
              </div>
            )).slice(300, 304)}
        </div>
     </div>
    
    
    
    </div>
  )
}

export default Landing