import React  from 'react'
import { useSelector } from 'react-redux'

export default function HistoryDetailsView() {

    const paymentDetails = useSelector((state) => state.paymentDetails)
    console.log(paymentDetails)

  return (
      <div>
          <p>Date approved: {paymentDetails?.date?.slice(0, 10)} </p>
          <p>Status: {paymentDetails?.status} </p>
          <div>Products: {paymentDetails?.products?.map((p) => {
              return (
                  <div>
                    <ul>
                        <li>Name: {p.title}</li>
                        <li>Quantity: {p.quantity}</li>
                        <li>Price Unit: {p.unit_price}</li>
                    </ul>
                  </div>
              )
          })} </div>
    </div>
  )
}

/* 
product = {title: item.title,
        unit_price: item.price,
        quantity: item.quantity}

const formatInfo = {
            products: r.data.additional_info.items,
            date: r.data.date_approved,
            status: r.data.status,
            fullPrice: r.data.transaction_amount,
        };
*/

