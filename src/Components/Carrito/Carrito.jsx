import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Product from '../Product/Product';
import s from '../Home/home.module.css'

export default function Carrito(){
    const Carrito=useSelector((state)=>state.Carrito)
    
        

    

    return(
        <div className={s.boxcarrito}>
            <Link to='/products'><button className={s.btnvolver}>Volver</button></Link>

        {/* <h4>{Carrito.length}</h4> */}

        {<div className={s.grid}>
             {Carrito.length>0&&Carrito.map((product,i) => (
               <div  key={i} >
                 <Product products={product}></Product>
                
               </div>
             ))}
           </div>
         }




        </div>
    )
}