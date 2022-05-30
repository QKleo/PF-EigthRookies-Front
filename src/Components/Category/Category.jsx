import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getError } from "../../utils";
import Product from "../Product/Product";
import s from '../../screens/home.module.css'



const reducer = (state, action) => {
  switch (action.type) {
    case 'AXIOS_REQUEST':
      return { ...state, loading: true };
    case 'AXIOS_SUCCESS':
      return {
        ...state,
        products: action.payload.products[0].products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'AXIOS_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



export default function ProductScreen() {
  const navigate = useNavigate()
  const { search } = useLocation();
  
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;
  
  

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:3001/paginado/search?page=${page}&category=${category}`
            // `http://localhost:3001/paginado/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
          );
          dispatch({ type: 'AXIOS_SUCCESS', payload: data });
          console.log("soy products" , data)
        } catch (err) {
          dispatch({
            type: 'AXIOS_FAIL',
            payload: getError(err),
          });
        }
      };
      fetchData();
    }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([])
  useEffect(() => {
    const axiosCategories = async () => {
      try {
      const { data } = await axios.get(`http://localhost:3001/category`);
      setCategories(data);
      } catch (err) {
      dispatch({type: 'AXIOS_FAIL', payload: getError(err),});
      }
    };
    axiosCategories();
  }, [dispatch]);

  const getFilterUrl = (e) => {
    const filterPage = e.page || page;
    const filterCategory = e.category || category;
    // const filterQuery = e.query || query;
    // const filterRating = e.rating || rating;
    // const filterPrice = e.price || price;
    // const sortOrder = e.order || order;
    return `/search?category=${filterCategory}&page=${filterPage}`
    
    // return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

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
          <select onChange={(e) => {
            navigate(getFilterUrl({
              category: e.target.value,
              page: 1
            }));
          }}>
          <option value={"all"}>
                  Categories
          </option>
          {categories?.map((cat) => (
          <option key={cat.name} value={cat.id}>
            {cat.name} 
          </option>
          ))}
          </select>
          <div>
                {[...Array(pages).keys()].map((x) => (
                  <button
                    onClick={() => {navigate(getFilterUrl({ page: x + 1 }))}}
                    key={x + 1}
                  >
                    
                      {x + 1}
                    </button>
                  
                ))}
          </div>
          <div >
            <div className={s.grid}>
              {products?.map((product) => (
                <div className={s.lala} key={product.id} >
                  <Product products={product} />
                </div>
              ))}
            </div>

          </div>
        </>
  );

}
