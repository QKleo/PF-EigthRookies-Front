import axios from 'axios';

export const SEARCH_PRODUCT = 'SEARCH PRODUCT';

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
