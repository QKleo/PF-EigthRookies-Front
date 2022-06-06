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
        navigate('/paginado');
    };


    return (
        <div className={style.inputSearch}>
            <form onSubmit={handlerSubmit}>
            <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                autoComplete='off'
                placeholder='	Buscar...'
                id="search"
                type="search"
                required />
            <span className={style.caret}></span>
        </form>
        </div>
    );
}
