import React from 'react';
import { Link } from 'react-router-dom';
import './CardDiscount.css';

function CardDiscount({ image, name, id, price, discount }) {
    return (
        <div className="card">
            <img alt="" src={image} />
            <div className="card-container">

                <div className="top-left"> {discount} </div>

            </div>
            <div className="info">
                <h1>{name}</h1>
                <fieldset>
                    <legend> {discount} </legend>
                    <h3 >Aprovecha este increible descuento</h3>
                    <small>Precio final:</small>
                    <p>${price} </p>
                </fieldset>
                <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <button>Ver más</button>
                </Link>
            </div>
        </div>
    );
}

export default CardDiscount;
