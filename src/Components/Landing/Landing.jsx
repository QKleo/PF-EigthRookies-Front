import React from 'react';
import Product  from '../Product/Product.jsx'
import s from './landing.module.css'
import { useEffect, useReducer} from 'react';
import axios from 'axios';
import EmblaCarousel from "../Carrusel/EmblaCarousel";


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
    };
    axiosData();
  }, []);

  const SLIDE_COUNT = 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  const [{ products }, dispatch] = useReducer((reducer), {
    products: [],
   
  });
    
  return (
    <div>

      <EmblaCarousel slides={slides} />  

      <h1>Bienvenido a The Rookies!</h1>
    
    <div className={s.grid}>
              {products?.map((product) => (
               
                  <Product products={product} key={product.id}/>
              
              )).slice(700, 708)}
            </div>
    
    
    
    </div>
  )
}

export default Landing
