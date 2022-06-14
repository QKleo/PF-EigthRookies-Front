import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import '../Login/login.css'

export default function HistoryPurchase() {

    const userActive = useSelector((state) => state.userActive)
    function getPayId(payment_id) {
        axios.get(`http://localhost:3001/purchases/${payment_id}`)
    }

    return (
        <>
            {userActive[0].user?.shoppingCars
                ? <>
            
            {userActive[0].user.shoppingCars?.map((car) => {
                return (
                    <div className="container-purchase" key={car.payment_id}>
                        <p>Status: <strong>{car.status}</strong></p>
                        <p>Order Nº: <strong>{ car.payment_id}</strong></p>
                        <p>Payment type: <strong>{ car.payment_type}</strong></p>
                        <p>Date: <strong>{car.updatedAt.slice(0, 10)}</strong></p>
                        <button className='btnBlue' onClick={() => getPayId(car.payment_id)}>Details</button>
                </div>
            )
        })}
      </>
                : <div className="container-LoginAuth0">
                   <h2 className='title'>You have no purchace...</h2>
                </div>
        }
        
        </>
  )
}
