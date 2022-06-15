import React,{useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {addReview} from '../../Redux/actionReviews';
import { useAuth0 } from '@auth0/auth0-react';
import { getOrder } from '../../Redux/actionsCarrito';


//addReview(review, productId)


export default function Reviews ({productId}) {
    const { user, logout} = useAuth0();
    const dispatch = useDispatch();
    
    const userEmail = user?.email;
    const usuario = user?.name;

    const [review, setReview] = useState({
        title: usuario,
        content: "",
        rate: "",
        userEmail: userEmail
    })

    var arrcoment = review.content.split(" ");
    
    const[error, setError] = useState({
        content: "",
        rate: ""
    });


    function validate(e){
        if(e.target.name === "content"){
            if(arrcoment.length < 5){
                setError({
                    ...error,
                    name: "El campo tiene que tener al menos 5 palabras"
                })
            }
        }
        if(e.target.name === "rate"){
            if(!e.target.value){
                setError({
                    ...error,
                    name:"Necesita puntuar con rates"
                })
            }
        }
    }

    function setRating(e){
        e.preventDefault()
        setReview({
            ...review,
            rate:e.target.value
        })
    }


   function handleChange(e){
    e.preventDefault()
    validate(e)
    setReview({
        ...review,
        [e.target.name]: e.target.value
    })
   }

    function handleClick(e){
        e.preventDefault()
        
        dispatch(addReview( review, productId))
        console.log(review, productId)
        alert("Has agregado un nuevo content")
        setReview({
            content: "",
            rate: ""
        })
        

    }

    return (
        <div>
            <div>
                <h3>Agrega tu review</h3>
                <form onSubmit={handleClick}>
                    <div>
                    <label>Ingrese su review (minimo 5 palabras)</label>
                    <br/>
                    <textarea 
                        style={{resize:'none'}}
                        name="content"
                        value={review.content}
                        rows="3" cols="70"
                        onChange={e=>handleChange(e)} type="text" 
                        placeholder='tu content' />
                        {error.content && <p style={{color:"red"}}>
                            {error.content}</p>}
                    </div>
                    <div>
                    <label>stars</label>
                    
                    <div>
                        <strong>Star</strong>
                        <select onChange={e => {setRating(e)}}>
                            <option value=""> select... </option>
                            <option value="1"> -1- </option>
                            <option value="2"> -2- </option>
                            <option value="3"> -3- </option>
                            <option value="4"> -4- </option>
                            <option value="5"> -5- </option>
                        </select>
                    </div>
                    {error.rate && <p style={{color:"red"}}>
                            {error.rate}</p>}
                    </div>
                    <input type="submit" value="Enviar Review"/>
                </form>
                
            </div>
            
        </div>
    )
} 
