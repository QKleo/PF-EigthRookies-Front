import React  from "react";
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Product from '../components/Product/Product.jsx';

import s from './home.module.css'
// import data from '../data';
import PaginadoAux from '../components/PaginadoAux.jsx';
import { obtenerTodosCategory, obtenerTodosProducts, vaciarRespuesta } from "../redux/actions"
import { useDispatch } from 'react-redux';
import Filtros from '../components/Filtros';
import Ordenar from '../components/Ordenar.jsx';
import { Link } from 'react-router-dom';

  export default function HomeScreen(){
    const Allproduct=useSelector((state)=>state.Allproduct)
    const Products=useSelector((state)=>state. productResult)
    const ProductAux=useSelector((state)=>state.productResultAux)
    const Respuesta=useSelector((state)=>state.Respuesta)
    const Carrito=useSelector((state=>state.Carrito))
    const dispatch=useDispatch()
    let maxi
    let elementosMostrar=12
    let ProductMostrar=[]
    const[paginado,setpaginado]=useState(0)
    useEffect(()=>{traer();return setpaginado(0)},[Allproduct.length])
    

    function traer(){
        dispatch(obtenerTodosProducts())
        dispatch(obtenerTodosCategory())

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
      {/* {Allproduct.length} */}
      {/* <FilterCategories/> */}
      <Filtros arrObj={Products}  arrObjAux={ProductAux} Allproduct={Allproduct}/>
      <Ordenar arrObj={Products} arrObjAux={ProductAux}/>
      {Respuesta.length>0&&<span>{Respuesta[0].msg}
                            <button onClick={()=>dispatch(vaciarRespuesta())}>
                            x</button>
                          </span>}
      <div>

      

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

      {/* {Carrito.length} */}
      </div>
      <div style={{textAlign:'center'}}>
      <PaginadoAux   setpaginado={setpaginado} paginado={paginado} max={maxi} 
                     elementosMostrar={elementosMostrar}    />
      </div>
      {/* <Link to='/products/carrito'><button >carrito</button></Link> */}
    </div>
  );
}