import { useEffect, useReducer} from 'react';
import axios from 'axios';
import Product from '../components/Product/Product.jsx';
import React  from "react";
import s from './home.module.css'
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

  ;
  
  
   return (
    <div>

        <h1>Products</h1>
      <div className={s.filtros}>
          <div>
            <label>Precio: </label>
            <select onChange={(e) => (e)}>
              <option value="default" selected disabled>
                Ordenamiento por precio
              </option>
              <option value="Ascendant population">Ascendente</option>
              <option value="Descendant population">Descendente</option>
            </select>
          </div>
          <div>
            <label>Alfabeticamente: </label>

            <select onChange={(e) => (e)}>
              <option value="default" selected disabled>
                A-Z
              </option>
              <option value="Ascendant">Ascendente</option>
              <option value="Descendant">Descendente</option>
            </select>
          </div>
          <div>
            <label>Productos: </label>

            <select onChange={(e) => (e)}>
              <option value="default" selected disabled>
                Categoria
              </option>
              <option value="All">All</option>
              <option value="CELLPHONES">Celulares</option>
              <option value="NOTEBOOKS">Notebooks</option>
              <option value="PC_DESKOPTS">Deskopts</option>
              <option value="PRENDRIVES">Pendrives</option>
              <option value="TABLETS">Tablets</option>
              <option value="MOUSE_PC">Mouse</option>
              <option value="COMPUTER_PROCCESOR">Procesadores</option>
              <option value="MICROPHONES">Microfonos</option>
              <option value="PC_KEYS">Teclados</option>
              <option value="GRAPHIC_CARDS">Tarjetas Graficas</option>

            </select>
          </div>
          </div>
      

      <div >
     
   
          <div className={s.grid}>
            {products.map((product) => (
              <div  className={s.lala} key={product.slug} >
                <Product products={product}></Product>
              </div>
            ))}
          </div>
    
      </div>
    </div>
  );
}
export default HomeScreen;