import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux" 
import { createProduct,upDateProduct,obtenerTodosProducts,obtenerTodosCategory,vaciarRespuesta } from "../../../Redux/actions"



export default function ProductsForms(){
    let namesMostra=[]
    let obj={}
    const dispatch=useDispatch()
    const[formState,setformState]=useState({
        new:false,
        UpDate:false,
        name:'',
        nameSelect:'',
        nameinput:'',
        category:'',
        description:'',
        image:'',
        image2:'',
        image3:'',
        image4:'',
        price:'',
        range_price:'',
        inputcategory:'',
        productId:'',


    })
    const Allproduct=useSelector(state=>state.Allproduct)
    const Category=useSelector(state=>state.Category)
    const Respuesta=useSelector(state=>state.Respuesta)
   // useEffect(()=>{traer()},[Allproduct.length,Category.length])
    useEffect(()=>{traer()},[Respuesta.length])
    function traer(){
        dispatch(obtenerTodosProducts())
        dispatch(obtenerTodosCategory())
        dispatch(vaciarRespuesta)
    }
    function handleOnChange(e){
        e.preventDefault(e)
        const{name,value}=e.target
        name==='name'&&setformState({...formState,['name']:validarCadena(value,25)?value:formState.name})
        name==='description'&&setformState({...formState,['description']:value})
       
        name==='image'&&setformState({...formState,['image']:value})
        name==='image2'&&setformState({...formState,['image2']:value})
        name==='image3'&&setformState({...formState,['image3']:value})
        name==='image4'&&setformState({...formState,['image4']:value})
        name==='price'&&setformState({...formState,['price']:validarNumero(value,7)?value:
        formState[name].length>0?formState[name].slice(1):''})
        name==='range_price'&&setformState({...formState,['range_price']:value})
        name==='category'&&setformState({...formState,['category']:value})
        if(name==='nameSelect'){
            setformState({...formState,
                ['name']:value,['description']:obj.description,['image']:obj.image,
                ['image2']:obj.image2,['image3']:obj.image3,['image4']:obj.image4,
                ['price']:obj.price,['range_price']:obj.range_price,
                ['category']:obj.categoryid*1,['inputcategory']:obj.categoryName,
                ['productId']:obj.id
        
        
            })
           
        }
       
    }   
   
    
    if(formState.name){
        namesMostra=Allproduct.filter(e=>e.name.toLowerCase().match(formState.name.toLowerCase()))
    }
    if(!formState.name){
        namesMostra=Allproduct.length>0&&Allproduct.map(e=>e)
       
    }
    function cleanState(){
        setformState({
            new:false,
            UpDate:false,
            name:'',
            nameSelect:'',
            nameinput:'',
            category:'',
            description:'',
            image:'',
            image2:'',
            image3:'',
            image4:'',
            price:'',
            range_price:'',
            inputcategory:'',
            productId:'',
        })
    }

    function validarNumero(str,len){
        if(str.length>len){return false}
        if(str*1>1000000){return false}
        return parseInt(str*1)&&true
    }

    function validarCadena(str,len){
   
    
         if(str.length>len){return false}
           
            str=str.split('-').join('')
            str=str.split('/').join('')
            let primero=/\W/.test(str)
           // let segundo=/\d/.test(str)
            return !primero //&& !segundo 
      
    }








    function handleOnClick(e){
        e.preventDefault(e)
        if(formState.name&&formState.description&&
            formState.image&&formState.price&&formState.range_price&&
            formState.category){
                if(formState.new){
                        dispatch(createProduct(formState))
                        cleanState()
                       // dispatch(obtenerTodosProducts())
                    }
                if(formState.UpDate){
                        dispatch(upDateProduct(formState.productId,formState))
                        cleanState()
                        dispatch(obtenerTodosProducts())
                        
                
                }


            }else{
                console.log('no puedo')
            }


    }

    return(
        <div>
           
            {/* {Names.length&&'algo'}*/}
            <h4>cantidad de products:{namesMostra.length&&namesMostra.length}</h4> 
          
            <button onClick={()=>setformState({['new']:true,['UpDate']:false})}>New</button>
            <button onClick={()=>setformState({['UpDate']:true,['new']:false})}>UpDate</button>
            <form action="" autoComplete="off" >
                <div>
                 <input type="text" name='name'placeholder={formState.UpDate?'Search':'Name'}
                  value={formState.name} onChange={(e)=>handleOnChange(e) }/>
                  
                  
                  

                    {formState.UpDate&&
                        <select name="nameSelect" id=""onChange={(e)=>handleOnChange(e) }>
                            <option>Productos</option>
                           {namesMostra.length>0&&namesMostra.map((e,i)=>{
                            obj={id:e.id,name:e.name,description:e.description,image:e.image,
                            image2:e.image2,image3:e.image3,image4:e.image4,price:e.price,
                            range_price:e.range_price,categoryid:e.category&&e.category.id,

                            categoryName:e.category&&e.category.name}

                               return <option value={obj.name}
                               key={i}>{obj.name}</option>})}
                        </select>  
                    }    
                </div>
              
                <div>
                    <input type="text"name='description' onChange={(e)=>handleOnChange(e) }
                    placeholder={formState.UpDate?obj.description:'description'}
                    value={formState.description}
                    />
                    
                </div>
                <div>
                    <input type="text"  name='image'onChange={(e)=>handleOnChange(e) }
                    placeholder={formState.UpDate?obj.image:'image'}
                    value={formState.image}/>
                    
                </div>
                <div>
                    <input type="text"  name='image2'onChange={(e)=>handleOnChange(e) }
                    placeholder={formState.UpDate?obj.image2:'image2'}
                    value={formState.image2}/>
                    
                </div>
                <div>
                    <input type="text"  name='image3'onChange={(e)=>handleOnChange(e) }
                    placeholder={formState.UpDate?obj.image3:'image3'}
                    value={formState.image3}/>
                    
                 </div>
                <div>
                    <input type="text" name='image4' onChange={(e)=>handleOnChange(e) }
                    placeholder={formState.UpDate?obj.image4:'image4'}
                    value={formState.image4}/>
                   
                </div>
                <div>
                    <input type="text" name='price' onChange={(e)=>handleOnChange(e) }
                    placeholder={formState.UpDate?obj.price:'price'}
                    value={formState.price}/>
                    
                </div>
                <div>
                    <input type="text"name='range_price' onChange={(e)=>handleOnChange(e) }
                    placeholder={formState.UpDate?obj.range_price:'range_price'}
                    value={formState.range_price}/>
                 
                </div>
                <div>
                    <label>{obj.categoryName}</label>
                </div>
                <div>
                   
                    <select name='category' onChange={(e)=>handleOnChange(e) } >
                        {Category.map((e,i)=>{
                                
                            return <option value={e.id}key={i}>{e.name}</option>})}
                    </select>
                </div>
                        
            </form>


                         
        {formState.new&&<button onClick={(e)=>handleOnClick(e)}>Enviar</button>}
        {formState.UpDate&&<button onClick={(e)=>handleOnClick(e)}>Actualizar</button>}
        </div>
    )
}