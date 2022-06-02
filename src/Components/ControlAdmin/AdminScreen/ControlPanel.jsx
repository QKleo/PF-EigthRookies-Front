
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux" 
import ProductsForm from '../AdminComponets/ProductsForms'
import { obtenerTodosProducts,obtenerTodosCategory } from "../../../Redux/actions"
export default function ControlPanel(){
    const Allproduct=useSelector((state)=>state.Allproduct)
    const Category=useSelector((state)=>state.Category)
    const[localState,setlocalState]=useState({
        createCategory:false,
        deleteCategory:false,
        upDateCategory:false,
        createProduct:false,
        deleteProduct:false,
        upDateProduct:false,
        product:false,
        category:false,

    })
    const dispatch=useDispatch()
 

    


    function handleOnChangeOperation(){}

    function handleOnChangeSearch(){}

    function handleOnClick(){}

    return(
        <div>
            <h4>Control Panel</h4>
           
             <div>   
                    <div>
                        
                        <button onClick={()=>{
                            setlocalState({['product']:!localState.product})
                        }  }>Product Menu</button>
                        <button onClick={()=>{
                            setlocalState({['category']:!localState.category})
                        }  }>Category menu</button>
                      
                       
                     {/* <h1> {localState.valida?'true':'false'}</h1> */}
                    </div>
                    <div>
                    {localState.product&&<ProductsForm/>}
                    {localState.category&&'form category'}    
                    </div>
                

             </div>   













        </div> 
    )
}