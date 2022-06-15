import React, { useEffect, useState } from 'react';
// import Success from './Success';
// import Failure from './Failure';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeOrderStatus, getOrder, getUserInfo } from '../../Redux/actionsCarrito';
import PreviewCard from '../PreviewCard/PreviewCard';
import { useAuth0 } from '@auth0/auth0-react';
import s from './preview.module.css'

export default function Preview() {
  const {purchaseId} = useParams();
  const {user, isAuthenticated} = useAuth0();
  const dispatch = useDispatch();
  const resChangeOrderStatus = useSelector((state) => state.resChangeOrderStatus);
  const inCart = useSelector((state) => state.inCart);
  const products = useSelector((state) => state.finished);
  const userInfo = useSelector((state) => state.userInfo);
  const address = userInfo?.address || "";

  useEffect(() => {
    if(isAuthenticated && inCart.length > 0){
    const ordersIds = inCart.map((e) => e.orders[0].id);
    dispatch(changeOrderStatus({purchaseId: purchaseId, ordersIds: ordersIds}));
    }
  }, [ isAuthenticated, inCart]);

  useEffect(() => {
    if(isAuthenticated){
      dispatch(getOrder({ status: 'inCart', user: user.email }))
      dispatch(getOrder({status: "finished", user: user.email, purchaseId: purchaseId}))
      dispatch(getUserInfo(user.email))
    }
  }, [isAuthenticated, resChangeOrderStatus]);

var today = new Date();

var date = today.getFullYear()+'-'+(today.getMonth()+2)+'-'+today.getDate();


  return (
    <div>
      {resChangeOrderStatus.status === "approved" ?
      <form>
        <div>
          <h1>Your payment has result: {resChangeOrderStatus.status}</h1>
        </div>
          <div className={s.grid}>
        {products?.length &&
          products?.map((product) => {
            return (
              <PreviewCard key={product.id} products={product}/>
            );
          })}
          </div>
        <label>
          Delivery Address:
          <select>
            {address?.length ? (  
            <option>{address}</option>
            ) : (
            <option>Rosalia de Castro 677</option>
            )}
          </select>
        </label>
        <div>
          {resChangeOrderStatus && resChangeOrderStatus?.fullPrice && (
            <h4>Cart price: ${resChangeOrderStatus && resChangeOrderStatus.fullPrice}</h4>
          )}
          {products && products?.length > 0 && (
            <h4>Shipping cost: {"$200"}</h4>
          )}
          {resChangeOrderStatus && resChangeOrderStatus?.fullPrice && (
            <h4>
              Total:{' '}
              ${Math.round((Number(resChangeOrderStatus.fullPrice) + 200) * 100) / 100}
            </h4>
          )}
        </div>
        <h5>
        Estimated delivery date: {date}
        </h5>
      </form>
      : <h5>Your payment is pending confirmation</h5>}
    </div>
  );
}