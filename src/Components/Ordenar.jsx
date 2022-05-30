import { useDispatch } from "react-redux"
import { ordenar } from "../Redux/actions"



export default function Ordenar(props){
    const dispatch=useDispatch()

    return(
        <div>
            <button onClick={()=>
                dispatch(ordenar(props.arrObj,props.arrObjAux,'name',false))}
            >A-z</button>
            <button onClick={()=>
                dispatch(ordenar(props.arrObj,props.arrObjAux,'name',true))}
                >Z-a</button>
            <button onClick={()=>
                dispatch(ordenar(props.arrObj,props.arrObjAux,'price',true))}
                >Price-Mayor-menor</button>
            <button onClick={()=>
                dispatch(ordenar(props.arrObj,props.arrObjAux,'price',false))}
                >Price-Menor-mayor</button>
        
        
        
        </div>



    )
}