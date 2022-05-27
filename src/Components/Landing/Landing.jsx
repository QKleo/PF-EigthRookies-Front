import React from 'react'
import Carrusel from '../Carrusel/Carrusel'
import Product  from '../Product/Product.jsx'
import s from './landing.module.css'


function Landing () {
    
  return (
    <div>
    
    <h1>Bienvenido a The Rookies!</h1>
    <Carrusel/>
    
    <div className={s.caja}>
        <div  className={s.lala} >
        <Product products={Product}></Product>      
        </div>
        <div  className={s.lala} >
        <Product products={Product}></Product>      
        </div>
        <div  className={s.lala} >
        <Product products={Product}></Product>      
        </div>
        <div  className={s.lala} >
        <Product products={Product}></Product>      
        </div>
     </div>
    
    
    
    </div>
  )
}

export default Landing