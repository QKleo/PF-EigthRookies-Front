import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getError } from "../Herramientas/utils";
import Product from "../Product/Product";
import estilo from './category.module.css'



const reducer = (state, action) => {
  switch (action.type) {
    case 'AXIOS_REQUEST':
      return { ...state, loading: true };
    case 'AXIOS_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
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
  const price = sp.get('price') || '';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'ASC';
  const page = sp.get('page') || 1;
  

  const [{ loading, error, products, pages }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:3001/paginado/search?page=${page}&category=${category}&order=${order}&price=${price}`
            // `http://localhost:3001/paginado/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
          );
          dispatch({ type: 'AXIOS_SUCCESS', payload: data });
          
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
    const filterPrice = e.price || price;
    const sortOrder = e.order || order;
    return `/search?category=${filterCategory}&page=${filterPage}&order=${sortOrder}&price=${filterPrice}`
    
    // return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

var ini=0;
var fin=0;


if(parseInt(page)<=3){
  ini=0;
  if(parseInt(pages)<7)
    fin=parseInt(pages);
  else
    fin=5;
}else if(parseInt(page)>=parseInt(pages)-2){
  if(parseInt(pages)<=5)
    ini=0;
  else
    ini=parseInt(pages)-5;
  fin=parseInt(pages);
}else{
  ini = parseInt(page)-3;
  fin = parseInt(page)+2;
}

var input = "";

function handleOnChange(e){
  e.preventDefault()
  const{value}=e.target
  input = value
  return input;
}

function handleOnClick(e){
  e.preventDefault()
  const budget = document.getElementById('budget');
  // 👇️ clear input field
  budget.value = '';
  navigate(getFilterUrl({ price: input , page: 1}))
}

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
          <div className={estilo.filterDiv}>
          <select onChange={(e) => {
            navigate(getFilterUrl({
              category: e.target.value,
              page: 1
            }));
          }}
          className={estilo.filter}
          >
          <option value={"all"}>
                  Categories
          </option>
          {categories?.map((cat) => (
          <option key={cat.name} value={cat.id}>
            {cat.name[0] + cat.name.replace(/[#_]/g, " ").slice(1).toLowerCase()} 
          </option>
          ))}
          </select>
          <form className={estilo.search}>
          <input id="budget" type="number" placeholder="Enter your budget here" onChange={(e)=>handleOnChange(e)}/>
          <button className={estilo.buttonSearch} onClick={(e) => handleOnClick(e)}>🔍︎</button>
          </form>
         
            
            
          <select
                onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                      
                    }}
                    className={estilo.filter}
                  >
                    <option value="A-Z">Alphabetical: A to Z</option>
                    <option value="Z-A">Alphabetical: Z to A</option>
                    <option value="ASC">Price: Low to High</option>
                    <option value="DESC">Price: High to Low</option>
                    
          </select>
          
        
          </div>
          
          
          {price !== '' ? (
          <div className={estilo.display}>
          <h4> Prices below than: </h4>
          <button className={estilo.seleccionado}>{"$ " + price}</button> 
          
                      <button
                        onClick={() => (navigate(`/search?category=${category}&page=1&order=${order}`))}
                        className={estilo.deleteButton}
                      >
                      x
                      </button>
            </div>
            ) : null}
          
          
          <div className={estilo.display}>
              
              <button className={estilo.pagination} onClick={() => {navigate(getFilterUrl({page: 1}))}}> {`<<`} </button>
              <button className={estilo.pagination} onClick={() => {navigate(getFilterUrl({page: page - 1}))}}> {`<`} </button>
                {[...Array(pages).keys()].map((x) => (
                  <button
                    onClick={() => {navigate(getFilterUrl({ page: x + 1 }))}}
                    key={x + 1}
                    className={ x + 1 === page ? estilo.seleccionado : estilo.pagination  }
                  >
                    
                      {x + 1}
                    </button>
                  
                )).slice(ini,fin)}
              <button className={estilo.pagination} onClick={() => {navigate(getFilterUrl({page: (Number(page) + 1 <= fin) ? Number(page) + 1 : fin}))}}> {`>`} </button>
              <button className={estilo.pagination} onClick={() => {navigate(getFilterUrl({page: pages}))}}> {`>>`} </button>
          </div>
          
            <div className={estilo.grid}>
              {products?.map((product) => (
               
                  <Product products={product} key={product.id}/>
              
              ))}
            </div>
          {console.log("soy products" , products)}
        </>
  );

}
