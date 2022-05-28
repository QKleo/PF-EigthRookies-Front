import {
    SEARCH_PRODUCT,TODOS_PRODUCT
} from "./actions";

const initialState = {
    productResult: [],
    productResultAux:[],
    Allproduct:[],
};

export default function rootReducer(state = initialState, { type, payload }) {

    switch (type) {
        case SEARCH_PRODUCT:
            return {
                ...state,
                productResult: payload,
            };
        case TODOS_PRODUCT:
            console.log('kk',payload)
            return{
                ...state,
                Allproduct:payload,
               // productResultAux:payload,
                productResult:payload,
            }

        default: return state;
    }
}
