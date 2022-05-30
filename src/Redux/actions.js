import axios from 'axios';
import ordenarBublee from '../components/herramientas/ordenarNumeros';

export const SEARCH_PRODUCT = 'SEARCH PRODUCT';
export const TODOS_PRODUCT='TODOS_PRODUCT';
export const TODOS_CATEGORY='TODOS_CATEGORY';
export const FILTRO_POR_CATEGORYAUX='FILTRO_POR_CATEGORYAUX';
export const VACIAR_AUXILIARP='VACIAR_AUXILIARP';
export const FILTRAR_POR_PRECIO='FILTRAR_POR_PRECIO';
export const NO_HAY_MATCH='NO_HAY_MATCH';
export const VACIAR_RESPUESTA='VACIAR_RESPUESTA';
export const ORDENAR='ORDENAR';
export const AGREGARCARRITO='AGREGARCARRITO';
export const ELIMINARDECARRITO='ELIMINARDECARRITO';
export const FILTRO_POR_CATEGORY='FILTRO_POR_CATEGORY'
export const ACTUALIZAR='ACTUALIZAR'

const URL = 'http://localhost:3001';

export function findProduct(name) {
    return async function (dispatch) {
        const res = await axios.get(`${URL}/products/search?name=${name}`);
        const product = res.data;
        dispatch({
            type: SEARCH_PRODUCT,
            payload: product
        });
    };
}
export function obtenerTodosProducts(){
    return(dispatch)=>{
        axios.get(`${URL}/products`)
        .then((r)=>{
            return dispatch({
                type:TODOS_PRODUCT,
                payload:r.data
            })
        })
        .catch((err)=>console.log(err))

    }
}

export function obtenerTodosCategory(){
    return(dispatch)=>{
        axios.get(`${URL}/category`)
        .then((r)=>{


        return dispatch({
            type:TODOS_CATEGORY,
            payload:r.data,
            })
        })
        .catch((err)=>console.log(err))
    }
}

export function filtroPorCategory(arrObj,arrObjAux,value){
    let r=[]
    if(arrObjAux.length>0){arrObj=arrObjAux}
    return(dispatch)=>{
        if(arrObj.length>0&&value){
            r=arrObj.filter(e=>e.category.id*1===value*1)
        }
        
        if(arrObjAux>0){
        return dispatch({
            type:FILTRO_POR_CATEGORYAUX,
            payload:r
        })
        }else{
            return dispatch({
                type:FILTRO_POR_CATEGORY,
                payload:r
            })
        }
    }
}

export function vaciarProductResultAux(){
    return(dispatch)=>{


        return dispatch({
            type:VACIAR_AUXILIARP,
            payload:''
        })
    }
}

export function filtrarPorPrecio(arrObj,arrObjAux,value){
    let r=[]
    console.log(arrObjAux,'filtro')
    if(arrObjAux.length>0){arrObj=arrObjAux}
    return(dispatch)=>{
        r=arrObj.filter(e=>e.price*1<value)
        if(r.length===0){let respuesta=[{msg:'no hay match'}]
        return dispatch({
            type:NO_HAY_MATCH,
            payload:respuesta
        })        
        }

        return dispatch({
            type:FILTRAR_POR_PRECIO,
            payload:r
        })
    } 
}
export function vaciarRespuesta(){
    return(disptach)=>{
        return disptach({
            type:VACIAR_RESPUESTA,
            payload:''
        })
    }
}

export function ordenar(arrObj,arrObjAux,atributo,bandera){
    console.log(arrObjAux,'orden')
    if(arrObjAux.length>0){arrObj=arrObjAux}
    let aux=[]
    let estado=[]

    return(dispatch)=>{
        aux=arrObj.map(e=>{return e[atributo]})
       // console.log(aux)
        if(atributo==='name'){
            aux=aux.sort()
        }
        else if (atributo==='price'){
            aux=ordenarBublee(aux)
            console.log(aux)
            
        } 
        if(bandera){aux=aux.reverse()}

        while(aux.length>0){
            for(let e of arrObj){
                if(e[atributo]===aux[0]){
                    estado.push(e)
                    aux.shift()
                }
            }
        }
            
      
        return dispatch({
            type:ORDENAR,
            payload:estado


    })
 }
}
export function agregarProductoCarrito(obj){
    
    return(dispatch)=>{
        obj.EstoyEnElcarro=true
        //carritoState.push(obj)
        return dispatch({
            type:AGREGARCARRITO,
            payload:obj
        })

    }
}
export function eliminarProductoCarrito(obj,arrObj){
    return(dispatch)=>{
    obj.EstoyEnElcarro=false   
    arrObj=arrObj.filter(e=>e.id!==obj.id)
    return dispatch({
        type:ELIMINARDECARRITO,
        payload:arrObj
    })

    }
}
export function actualizar(arrObj){
    return(dispatch)=>{
        
        return dispatch({
            type:ACTUALIZAR,
            payload:arrObj
        })
    }
}