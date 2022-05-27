import React, { useState } from 'react';
import style from './SearchBox.module.css';
import findProducts from './findProducts';

export default function SearchBox() {

    const [input, setInput] = useState('');

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const result = await findProducts(input);
        console.log(result)
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
            <button className={style.basicBtn} type="submit">Buscar</button>
        </form>
    );
}
