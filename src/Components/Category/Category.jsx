import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getError } from "../../utils";
import FilterCategories from "../Filters/Filters";
import Product from "../Product/Product";
import s from '../../Screens/home.module.css';


const reducer = (state, action) => {
  switch (action.type) {
    case 'AXIOS_REQUEST':
      return { ...state, loading: true };
    case 'AXIOS_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        loading: false
      };
    case 'AXIOS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductScreen() {
  const params = useParams();
  const { id } = params;

  const [{ loading, error, products, }, dispatch] =
    useReducer(reducer, {
      products: [],
      loading: true,
      error: '',
    });

  useEffect(() => {
    const axiosCategories = async () => {
      dispatch({ type: 'AXIOS_REQUEST' });
      try {
        const { data } = await axios.get(`http://localhost:3001/category/${id}`);
        dispatch({ type: 'AXIOS_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'AXIOS_FAIL', payload: getError(err), });
      }
    };
    axiosCategories();
  }, [id]);

  return (
    loading ? (
      <>
        <p> Calling to the rookies...</p>
      </>
    ) :
      error ? (
        <>
          <p> {error}</p>
        </>
      ) :
        <>
          <FilterCategories />
          <div >
            <div className={s.grid}>
              {products.map((product) => (
                <div className={s.lala} key={product.id} >
                  <Product products={product} />
                </div>
              )).slice(0, 7)}
            </div>

          </div>
        </>
  );

}
