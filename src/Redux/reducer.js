

import {
    FILTRO_POR_CATEGORYAUX,
    SEARCH_PRODUCT,TODOS_CATEGORY,TODOS_PRODUCT, VACIAR_AUXILIARP,FILTRAR_POR_PRECIO
    ,NO_HAY_MATCH,VACIAR_RESPUESTA, ORDENAR,AGREGARCARRITO,ELIMINARDECARRITO,
    FILTRO_POR_CATEGORY ,ACTUALIZAR,CREATEPRODUCT,UPDATEPRODUCT   } from "./actions";

const initialState = {
    productResult: [],
    productResultAux:[],
    Allproduct:[],
    Category:[],
    Respuesta:[],
    Carrito:[]
};

export default function rootReducer(state = initialState, { type, payload }) {

    switch (type) {
        case SEARCH_PRODUCT:
            return {
                ...state,
                productResultAux:payload,
            };
        case TODOS_PRODUCT:
           // console.log('voy',payload)
            return{
                ...state,
                Allproduct:payload,
               // productResultAux:payload,
                productResult:payload,
            }
        case TODOS_CATEGORY:
            return{
                ...state,
                Category:payload
            }
        case FILTRO_POR_CATEGORYAUX:
            return{
                ...state,
                productResultAux:payload
            }
        case VACIAR_AUXILIARP:
            return{
                ...state,
                productResultAux:payload

            }
        case FILTRAR_POR_PRECIO:
            console.log(payload)
           
            return{
                ...state,
                productResultAux:payload
            }
        case NO_HAY_MATCH:
            return{
                ...state,
                productResultAux:'',
                Respuesta:payload,

            }
        case VACIAR_RESPUESTA:
            return{
                ...state,
                Respuesta:''
            }
        
        case ORDENAR:
           // console.log(payload)
            return{
                ...state,
                productResultAux:payload
            } 
        case AGREGARCARRITO:
            console.log(payload)
            return{
                ...state,
                Carrito:[payload,...state['Carrito']]
            }  
        case ELIMINARDECARRITO:
            return{
                ...state,
                Carrito:payload
            }  
        case FILTRO_POR_CATEGORY:
            return{
                ...state,
                productResult:payload,
            }
        case ACTUALIZAR:

            console.log('llega?') 
            console.log(payload)   
            return{
                ...state,
                productResultAux:'',
                
                productResult:payload
            }   
            case CREATEPRODUCT:
                return{
                    ...state,
                    Respuesta:payload
                }
            case UPDATEPRODUCT:
                return{
                    ...state,
                    Respuesta:payload
                }         


        default: return state;
    }
}