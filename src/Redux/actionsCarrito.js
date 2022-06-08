import axios from "axios";

export const AGREGARCARRITO='AGREGARCARRITO';
export const REMOVE_FROM_CART='REMOVE_FROM_CART';
export const CLEAR_CART="CLEAR_CART";
export const POST_ORDER="POST_ORDER";
export const GET_ORDERS="GET_ORDERS";
export const DELETE_ORDER="DELETE_ORDER";

export const addToCart = (product) => ({type:AGREGARCARRITO, payload: product})

export const removeFromCart = (product) => ({type:REMOVE_FROM_CART, payload: product})

export const clearCart = () => ({type:CLEAR_CART})


export const postOrder = (order) => async (dispatch) => {
// const token = window.localStorage.getItem("access");
//     if (token) {
    var {data}= await axios.post(`http://localhost:3001/order`, order);
        return dispatch({
            type: POST_ORDER,
            payload: { status: order.status, data },
        });
//     } else {
    //     console.log("soy order en postorder", order)
    //     if (order.status === "inCart") {
    //         if (!window.localStorage.getItem(`${order.status}`)) {
    //             window.localStorage.setItem(`${order.status}`, JSON.stringify(order))
    //         }
    //     }
    //     return {
    //         type: POST_ORDER,
    //         payload: Math.random(),
    //       };
    // }
}

export const getOrder = (order) => async (dispatch) => {
    var {data} = await axios.get(`http://localhost:3001/order?status=` + order.status);
    return dispatch({
        type: GET_ORDERS,
        payload: { status: order.status, data },
    });
}

export const deleteOrder = (order) => async (dispatch) => {
    var {data} = await axios.delete(`http://localhost:3001/order/${order}`)
    return dispatch({
        type: DELETE_ORDER,
        payload: { status: order.status, data },
    });
}
