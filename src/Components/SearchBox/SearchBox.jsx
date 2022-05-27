import React, { useState } from 'react';
import style from './SearchBox.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findProduct } from '../../Redux/actions';


export default function SearchBox() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState('');

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(findProduct(input));
        setInput('');
        navigate('/products');
    };


    return (
        <form onSubmit={handlerSubmit}>
            <input
                className={style.input}
                type="text"
                autoComplete='on'
                placeholder='Buscar producto...'
                onChange={(e) => setInput(e.target.value)}
                value={input}
            />
            <button className={style.basicBtn} type="submit">Buscar</button>
        </form>
    );
}
