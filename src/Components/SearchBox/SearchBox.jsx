import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './SearchBox.module.css';

export default function SearchBox() {

    const navigate = useNavigate();

    const [input, setInput] = useState('');

    const handlerSubmit = (e) => {
        e.preventDefault();
        navigate(`/products/buscar?name=${input}`);
        setInput('');
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
            <button type="submit">Buscar</button>
        </form>
    );
}
