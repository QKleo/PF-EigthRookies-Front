import React, { useEffect, useReducer} from "react";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { getError } from "../../utils";
import s from "../../Global.module.css"

const reducer = (state, action) => {
    switch (action.type) {
      case 'AXIOS_REQUEST':
        return { ...state, loading: true };
      case 'AXIOS_SUCCESS':
        return { ...state,loading: false, product: action.payload };
      case 'AXIOS_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

 

export default function ProductDetail(){
    const navigate = useNavigate;
    let { id } = useParams();
    
    useEffect(() => {
        const axiosData = async () => {
          dispatch({ type: 'AXIOS_REQUEST' });
          try {
            const response = await axios.get(`http://localhost:3001/products/${id}`);
            console.log(response.data)
            dispatch({ type: 'AXIOS_SUCCESS', payload: response.data });
          } catch (err) {
            dispatch({ type: 'AXIOS_FAIL', payload: getError(err) });
          }
        };
        axiosData();
      }, [id]);
    
    
    const [{ product , loading, error } , dispatch] = 
        useReducer(reducer, {
            product: [] ,
            loading: true,
            error: ""
        })

    

    return (
            loading? (
            <>
                <p> Calling to the rookies...</p>
            </>    
            ) :
            error? (
            <>
                <p> {error}</p>
            </>   
            ) :
            (<div className={s.productContainer}>
            <h1>{product.name}</h1>
            <img src={product.image} width="100px" height="150px" alt=""/>
            {/* <div className={s.categories}>Product category: {product.categoryId}</div> */}
            <div className={s.description}>{product.description}</div>
            <button className={s.basicBtn}> $ {product.price} 🛒</button>
            </div>)
    )
}