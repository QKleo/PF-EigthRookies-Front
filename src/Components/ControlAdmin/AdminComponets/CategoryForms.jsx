import { useState } from "react";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { crearCategory } from "../../../Redux/actions";

export default function CategoryForm(){

    const dispatch=useDispatch()

    const[formState,setformState]=useState({
        name:'',
    })
    //algo
    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        name==='name'&&setformState({['name']:validarCadena(value,15)?value.toLocaleUpperCase():formState.name.toLocaleUpperCase()})
    }
    function handleOnClick(e){
        e.preventDefault(e)
        dispatch(crearCategory(formState))

        setformState({['name']:''})

    }
    function validarCadena(str,len){
   
    
        if(str.length>len){return false}
          
           //str=str.split('-').join('')
           //str=str.split('/').join('')
           let primero=/\W/.test(str)
           let segundo=/\d/.test(str)
           return !primero && !segundo 
     
   }
    return(
        <div>
            <form action=""autoComplete="off">
                <input type="text" name='name'onChange={(e)=>handleOnChange(e)}
                value={formState.name}/>
                <button onClick={(e)=>{handleOnClick(e)}}>enviar</button>
            </form>

        </div>
    )
}