
import { useState } from "react"
import { useDispatch } from "react-redux/es/exports"
import { useSelector } from "react-redux/es/exports"
import { useEffect } from "react"
import { todosUsers,upDateFunction, vaciarRespuesta } from "../../../Redux/actions"


export default function UsersForm(){
    const dispatch=useDispatch()
    const[localSate,setlocalSate]=useState({
        email:'',
        functions:'',
        newfunctions:'',
        emailInput:''
    })
    let usersMostra=''
    const users= useSelector(state=>state.users)
    const Respuesta=useSelector(state=>state.Respuesta)
    useEffect(()=>{dispatch(todosUsers())},[Respuesta.length])

    function handleOnChange(e){
        
        e.preventDefault(e)
        const{name,value}=e.target
        name==='newfunctions'&&setlocalSate({...localSate,['newfunctions']:value})
        name==='email'&&setlocalSate({...localSate,['emailInput']:value})
        name==='emailInput'&&setlocalSate({...localSate,['emailInput']:value})
    }
    function handleOnClick(e){
        e.preventDefault(e)
        if(usersMostra.length>0){
        dispatch(upDateFunction(localSate.emailInput,{newfunctions:localSate.newfunctions}))
        dispatch(vaciarRespuesta())}
    }
    if(localSate.emailInput.length===0&&users.length>0){
        usersMostra=users
    }
    if(localSate.emailInput.length>0&&users.length>0){
        usersMostra=users.filter(e=>e.email.toLowerCase().match(localSate.emailInput.toLowerCase()))
    }

    return(
        <div>
            <h6 style={{color:'green'}}>o-admin</h6>
            <h6 style={{color:'blue'}}>o-usuario</h6>
            <h6 style={{color:'red'}}>o-banned</h6>
            <form action=""autoComplete="off">
            <div>
                <select name="newfunctions" id="" onChange={(e)=>{handleOnChange(e)}}>
                    <option value="">seleccione functions</option>
                    <option value="usuario">usuario</option>
                    <option value="admin">admin</option>
                    <option value="banned">banned</option>
                </select>
            </div>
            <div>
                <input type="text"placeholder="search"onChange={(e)=>handleOnChange(e)}
                name='emailInput' value={localSate.emailInput||''}/>
            </div>
            <div>
                <select name="email" id=""onChange={(e)=>{handleOnChange(e)}}>
                    <option value="">users</option>
                    {usersMostra.length>0&&usersMostra.map((e,i)=>{
                        return <option key={i} value={e.email}
                        style={{color:e.functions==='admin'?'green':e.functions==='usuario'?'blue':'red'}}
                        >{e.email}
                        
                        
                        </option>
                    })}
                </select>
            </div>

            </form>
            <div>
                <button onClick={(e)=>{handleOnClick(e)}}>submit</button>
            </div>
          
        </div>
    )
}