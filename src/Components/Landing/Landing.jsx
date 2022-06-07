import React from 'react';
import CardDiscount from './CardDiscount';
import s from './landing.module.css'
import { useEffect, useReducer} from 'react';
import axios from 'axios';
import EmblaCarousel from "../Carrusel/EmblaCarousel";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { findOrCreateUser } from '../../Redux/actions'

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

function Landing() {

  const crear = useDispatch();
  const userActive = useSelector((state) => state.userActive);
  const carrito = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useAuth0()

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

    if (isAuthenticated && !userActive.length) {
      crear(findOrCreateUser({
        email: user.email,
        first_name: user.given_name || user.nickname,
        last_name: user.family_name || undefined,
        image: user.picture,
        idRol: 1,
        shoppingCar: carrito
      }));
    }

  }, [isAuthenticated, userActive]);


  const [{ products }, dispatch] = useReducer((reducer), {
    products: [],
  });

  const SLIDE_COUNT = 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div>
    <h1>Welcome to The Rookies!</h1>

      <EmblaCarousel slides={slides} />  
    
    <div className={s.grid}>
              {products?.map((product) => (
               
                <div key={product.id}>
                  <CardDiscount
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    discount={'40%'}
                  />
                </div>
              
              )).slice(700, 708)}
      </div>

    </div>
  )
}

export default Landing
