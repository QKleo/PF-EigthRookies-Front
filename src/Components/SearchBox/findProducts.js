import axios from 'axios';

async function findProducts(input) {

    const product = await axios.get(`http://localhost:3001/products/search?name=${input}`);
    return product;

}

export default findProducts;
