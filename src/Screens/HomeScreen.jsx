
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Product from '../Components/Product/Product.jsx';
import React  from "react";
import s from './home.module.css'
import FilterCategories from '../Components/Filters/Filters.jsx';
// import data from '../data';
import PaginadoAux from '../Components/PaginadoAux.jsx';
import { obtenerTodosProducts } from "../Redux/actions"
import { useDispatch } from 'react-redux';


  export default function HomeScreen(){
    const Allproduct=useSelector((state)=>state.Allproduct)
    const Products=useSelector((state)=>state. productResult)
    const ProductAux=useSelector((state)=>state.productResultAux)
    const dispatch=useDispatch()
    let maxi
    let elementosMostrar=12
    let ProductMostrar=[]
    const[paginado,setpaginado]=useState(0)
    useEffect(()=>{traer();return setpaginado(0)},[Allproduct.length])
    

    function traer(){
        dispatch(obtenerTodosProducts())

    }
 
  // const [products, setProducts] = useState([]);
  

  let end=paginado*elementosMostrar+elementosMostrar

  const resultSearch = useSelector((state) => state.productResult);
  
  if (ProductAux.length===0 && Products.length>0){
      maxi=Math.floor(Products.length/elementosMostrar)
          
      ProductMostrar=Products.slice(paginado*elementosMostrar,end)
      
  }

  if(ProductAux.length>0 && Products.length>0){
      maxi=Math.floor(ProductAux.length/elementosMostrar)
      ProductMostrar=ProductAux.slice(paginado*elementosMostrar,end)
      
      }
  
 

  if(paginado<0){setpaginado(0)}
  if(paginado>maxi){setpaginado(maxi)}




   return (
    <div>
      {/* <FilterCategories/> */}
      <div>

      <h1>Products</h1>

         {/* {resultSearch.length
           ? <div className={s.grid}>
             {resultSearch.map((product) => (
               <div className={s.lala} key={product.id} >
                 <Product products={product}></Product>
               </div>
             ))}
           </div>: */}
           {<div className={s.grid}>
             {ProductMostrar.map((product) => (
               <div  key={product.id} >
                 <Product products={product}></Product>
                
               </div>
             ))}
           </div>
         }

    
      </div>
      <div style={{textAlign:'center'}}>
      <PaginadoAux   setpaginado={setpaginado} paginado={paginado} max={maxi} 
                     elementosMostrar={elementosMostrar}    />
      </div>
    </div>
  );
}
