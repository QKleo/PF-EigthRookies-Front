import { AGREGARCARRITO, REMOVE_FROM_CART, CLEAR_CART } from "./actionsCarrito";

import {
    FILTRO_POR_CATEGORYAUX,
    SEARCH_PRODUCT, TODOS_CATEGORY, TODOS_PRODUCT, VACIAR_AUXILIARP, FILTRAR_POR_PRECIO,
    NO_HAY_MATCH, VACIAR_RESPUESTA, ORDENAR, ELIMINARDECARRITO,
    FILTRO_POR_CATEGORY, ACTUALIZAR, CREATEPRODUCT, UPDATEPRODUCT, CREARCATEGORY
} from "./actions";

const initialState = {
    productResult: [],
    productResultAux: [],
    Allproduct: [],
    Category: [],
    Respuesta: [],
    cart: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    product: [],
    loading: true,
    error: "",
};

export default function rootReducer(state = initialState, { type, payload }) {

    switch (type) {
        case SEARCH_PRODUCT:
            return {
                ...state,
                productResultAux: payload,
            };
        case TODOS_PRODUCT:
            // console.log('voy',payload)
            return {
                ...state,
                Allproduct: payload,
                // productResultAux:payload,
                productResult: payload,
            };
        case TODOS_CATEGORY:
            return {
                ...state,
                Category: payload
            };
        case FILTRO_POR_CATEGORYAUX:
            return {
                ...state,
                productResultAux: payload
            };
        case VACIAR_AUXILIARP:
            return {
                ...state,
                productResultAux: payload

            };
        case FILTRAR_POR_PRECIO:
            console.log(payload);

            return {
                ...state,
                productResultAux: payload
            };
        case NO_HAY_MATCH:
            return {
                ...state,
                productResultAux: '',
                Respuesta: payload,

            };
        case VACIAR_RESPUESTA:
            return {
                ...state,
                Respuesta: ''
            };

        case ORDENAR:
            // console.log(payload)
            return {
                ...state,
                productResultAux: payload
            };
        case AGREGARCARRITO:

            const newItem = payload;
            const itemInCart = state.cart.find((p) => p.id === newItem.id);
            const cartItems = itemInCart
                ? state.cart.map((item) => item.id === newItem.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item)
                : [...state.cart, { ...newItem, quantity: 1 }];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log("soy add 1", state.cart);
            return {
                ...state,
                cart: cartItems
            };
        case REMOVE_FROM_CART:
            const productToDelete = state.cart.find((p) => p.id === payload.id);
            const cartProducts = productToDelete?.quantity > 1
                ? state.cart.map((item) => item.id === productToDelete.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item)
                : state.cart.filter((p) => p.id !== payload.id);
            localStorage.setItem('cartItems', JSON.stringify(cartProducts));

            console.log("soy remove 1", state.cart);
            return {
                ...state,
                cart: cartProducts
            };
        case CLEAR_CART:
            return { ...state, cart: [] };
        case FILTRO_POR_CATEGORY:
            return {
                ...state,
                productResult: payload,
            };
        case ACTUALIZAR:

            console.log('llega?');
            console.log(payload);
            return {
                ...state,
                productResultAux: '',

                productResult: payload
            };
        case CREATEPRODUCT:
            return {
                ...state,
                Respuesta: payload
            };
        case UPDATEPRODUCT:
            return {
                ...state,
                Respuesta: payload
            };
        case CREARCATEGORY:
            return {
                ...state,
                Respuesta: payload
            };

        case 'AXIOS_REQUEST':
            return { ...state, loading: true };

        case 'AXIOS_SUCCESS':
            return { ...state, loading: false, product: payload };

        case 'AXIOS_FAIL':
            return { ...state, loading: false, error: payload };

        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: payload.products,
                page: payload.page,
                pages: payload.pages,
                countProducts: payload.countProducts,
                loading: false,
            };
        case "FETCH_CATEGORIES":
            return {
                ...state,
                categories: payload,
                loading: false,
            };
        default: return state;
    }
}
