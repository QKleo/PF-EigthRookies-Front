import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Product from '../Components/Product/Product.jsx';
import s from '../Screens/home.module.css'

export default function Carrito(){
    const Carrito=useSelector((state)=>state.Carrito)
    
        

    

    return(
        <div>
            <Link to='/products'><button>volver</button></Link>

        <h4>{Carrito.length}</h4>

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