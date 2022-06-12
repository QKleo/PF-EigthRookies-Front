import React, { useEffect, useState } from 'react';
// import Success from './Success';
// import Failure from './Failure';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Preview({ products, data }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [res, setRes] = useState();
  const [render, setRender] = useState(true);
  const [status, setStatus] = useState(false);
  const [productPrices, setProductPrices] = useState(0);
  const fullPrice = useSelector((state) => state.resPostAllOrders);
  const userInfo = useSelector((state) => state.userInfo);
  const address = userInfo?.address || "";

 console.log(products)
  useEffect(() => {
    setProductPrices(products?.reduce((a, b) => ({
          price:
            a.price * (a.orders && a.orders[0].length > 0 ? a.orders[0].amount : 1) +
            b.price * (b.orders && b.orders[0].length > 0 ? b.orders[0].amount : 1),
        }))
        .price.toFixed(2)
        );
    }, [products]);

  return (
    <div>
      <form>
          <div>
        {products?.length &&
          products?.map((product) => {
            return (
              <div key={product.id}>
                <img src={product.image} width="150px" alt={product.name}></img>
                <h4>{product.name}</h4>
                Quantity: <h4>{product.orders && product.orders[0].amount}</h4>
                Price: <h4>{product.price}</h4>
              </div>
            );
          })}
          </div>
        <label>
          Directions:
          <select>
            {address?.length ? (  
            <option>{address}</option>
            ) : (
            <option>Calle falsa 123</option>
            )}
          </select>
        </label>
        <div>
          {products && products?.length > 0 && (
            <h1>Products price: {productPrices && productPrices}</h1>
          )}
          {products && products?.length > 0 && (
            <h1>Shipping cost: {"$200"}</h1>
          )}
          {products && products?.length > 0 && (
            <h1>
              Total:{' '}
              {Math.round((Number(productPrices) + 200) * 100) / 100}
            </h1>
          )}
        </div>
      </form>
    </div>
  );
}