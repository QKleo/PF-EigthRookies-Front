import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preview from '../Mercadopago/Preview';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { getOrder } from '../../Redux/actionsCarrito';
import { useAuth0 } from '@auth0/auth0-react';

export default function PurchasePage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const {isAuthenticated} = useAuth0();
    const inPending = useSelector((state) => state.pending);
    const resPutOrder = useSelector((state) => state.resPutOrder);
    const resDelete = useSelector((state) => state.deleted);
    const [data, setData] = useState('');
  
    useEffect(() => {
        if(isAuthenticated){
      dispatch(getOrder({ status: 'pending' }));
    }
    }, [resDelete, location.search, isAuthenticated]);

    useEffect(() => {
        // Transformo inPending en item para Mercado Pago
        let item = []
        if (inPending && !inPending.error) {
        item = inPending.map((e) => {
            return {
                title: e.name,
                quantity: e.orders[0].amount,
                price: e.price
            }
        });
        //Hago el Post de MercadoPago
            const idToken = axios
            .post('http://localhost:3001/mercadopay', {
              carrito: item,
            //   baseURL: window.location.href.slice(0, -9),
            })
            .then((data) => {
              //llega id
              if (data) {
                setData(data.data);
              }
            })
            .catch((err) => console.error(err));
        
        }
    },[inPending, resDelete, resPutOrder])
    console.log("soy data", data.response)
    console.log("soy data", data)
return (
    <>

      {/* {data && <Preview data={data} inPending={inPending} />}

      prueba */}
      {/* {inPending && <Preview data={data} products={inPending} />} */}
      
   
    </>
    );
}