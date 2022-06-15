import React  from 'react'
import { useSelector } from 'react-redux'

export default function HistoryDetailsView() {

    const paymentDetails = useSelector((state) => state.paymentDetails)

  return (
      <div>
          <p>Date approved: {paymentDetails?.date?.slice(0, 10)} </p>
          <p>Status: {paymentDetails?.status} </p>
          <div>Products: {paymentDetails?.products?.map((p) => {
              return (
                  <div key={p.title}>
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
