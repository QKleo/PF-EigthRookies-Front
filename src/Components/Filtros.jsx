import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { filtrarPorPrecio, filtroPorCategory, vaciarProductResultAux, vaciarRespuesta } from "../redux/actions"
import f from './filtros.module.css'

export default function Filtros(props){
    const dispatch=useDispatch()
    const todasLasCategorias=useSelector(state=>state.Category)
    const Respuesta=useSelector(state=>state.Respuesta)
    const[localState,setlocalState]=useState()


    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        if(name==='category'){
            
            dispatch(filtroPorCategory(props.arrObj,props.arrObjAux,value))
            // if(value==='todos'){
            //     dispatch(vaciarProductResultAux())}
        }
        if(name==='precio'){
            if(Respuesta.length>0){dispatch(vaciarRespuesta())}
            setlocalState(value)
        }
    }
    function handleOnClick(e){
        e.preventDefault(e)
        dispatch(filtrarPorPrecio(props.arrObj,props.arrObjAux,localState))
    }

    return(
        <div className={f.filtrosbox}>
            
            <select className={f.selectest}  name="category" id="" onChange={(e)=>{handleOnChange(e)}}>
                <option value={'todos'}>VER TODOS LOS PRODUCTOS</option>
            {todasLasCategorias.length>0&&todasLasCategorias.map((e,i)=>{
                <option value={'todos'}>ver todos</option>
                return <option key={i} value={e.id}>{e.name}</option>
            })}
            </select>
            <input type="number" name="precio" placeholder="precio"
                      onChange={(e)=>handleOnChange(e)}  />
            <button className={f.buttonS} onClick={(e)=>{handleOnClick(e)}}>buscar</button>        
        </div>
    )
}