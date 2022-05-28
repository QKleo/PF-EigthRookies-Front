
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { obtenerTodosProducts } from "../Redux/actions"
import Product from "../components/Product/Product"
import Cards from "../components/Cards"
import s from './home.module.css'
import PaginadoAux from "../components/PaginadoAux"


export default function HomeAlt(){
    const Allproduct=useSelector((state)=>state.Allproduct)
    const Products=useSelector((state)=>state. productResult)
    const ProductAux=useSelector((state)=>state.productResultAux)
    const dispatch=useDispatch()
    let maxi
    let elementosMostrar=12
    let ProductMostrar=[]
    const[paginado,setpaginado]=useState(0)
    useEffect(()=>{traer()},[Allproduct.length])

    function traer(){
        dispatch(obtenerTodosProducts())

    }
    
    let end=paginado*elementosMostrar+elementosMostrar


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





    return(
        <div>
            <h4>hola world {Products.length}-por pag{ProductMostrar.length}</h4>


            {Products.length>0&&ProductMostrar.map((product,i)=>
                
                <div  className={s.grid}key={i} >

                    <Cards image={product.image} 
                           name={product.name}
                           id={product.id}
                           price={product.price} 
                       
                       
                        
                      />
                    
                </div>

            )}

                <div>
                    <PaginadoAux setpaginado={setpaginado} paginado={paginado} max={maxi} 
                     elementosMostrar={elementosMostrar}/>
                </div>
        </div>
    )
}