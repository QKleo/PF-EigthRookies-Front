import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { filtrarPorPrecio, filtroPorCategory, vaciarProductResultAux, 
    obtenerTodosProducts,vaciarRespuesta,actualizar } from "../Redux/actions"

export default function Filtros(props){
    const objaux={}
    const dispatch=useDispatch()
    
    const todasLasCategorias=useSelector(state=>state.Category)
    const Respuesta=useSelector(state=>state.Respuesta)
    const[localState,setlocalState]=useState({
        price:'',
        category:''
    })


    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        if(name==='category'){

            setlocalState({['price']:''})
            setlocalState({['category']:value})
            dispatch(actualizar(props.Allproduct))
         //   dispatch(filtroPorCategory(props.arrObj,props.arrObjAux,localState.category))
           
        }
        if(name==='precio'){
            if(Respuesta.length>0){dispatch(vaciarRespuesta())}
                 setlocalState({['price']:value})
        }

    }
    function handleOnClick(e){
        e.preventDefault(e)
       
        dispatch(filtrarPorPrecio(props.arrObj,props.arrObjAux,localState.price))
    }
    function handleOnCategory(e){
        e.preventDefault(e)
        if(localState.category==='todos'){
         
            console.log('paso')
            dispatch(actualizar(props.Allproduct))
           }else{
            dispatch(filtroPorCategory(props.arrObj,props.arrObjAux,localState.category))
            
        }
}
    return(
        <div>
            {localState.price}
            <select name="category" id="" onChange={(e)=>{handleOnChange(e)}}>
                <option value={'todos'}>VER TODOS LOS PRODUCTOS</option>
            {todasLasCategorias.length>0&&todasLasCategorias.map((e,i)=>{
                
                return <option key={i} value={e.id}>{e.name}</option>
            })}
            </select>
            <button onClick={(e)=>handleOnCategory(e)} >filtrar</button>

            <input type="number" name="precio" placeholder="precio"
                  value={localState.price*1}    onChange={(e)=>handleOnChange(e)}  />
            <button onClick={(e)=>{handleOnClick(e)}}>buscar</button>        
        </div>
    )
}