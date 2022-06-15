
import { useState } from "react"
import { useDispatch } from "react-redux/es/exports"
import { useSelector } from "react-redux/es/exports"
import { useEffect } from "react"
import { todosUsers,upDateFunction, vaciarRespuesta } from "../../../Redux/actions"
import s from "./createProductScreen.module.css"
import { messageSuccess } from "../../Herramientas/MessageBox";


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
        messageSuccess(`User role updated`)
    }
    if(localSate.emailInput.length===0&&users.length>0){
        usersMostra=users
    }
    if(localSate.emailInput.length>0&&users.length>0){
        usersMostra=users.filter(e=>e.email.toLowerCase().match(localSate.emailInput.toLowerCase()))
    }

    return(
        <div className={s.userForm}>
            <div>
            <h2 style={{color:'green'}}>Color green = Role Admin</h2>
            <h2 style={{color:'blue'}}>Color blue = Role User</h2>
            <h2 style={{color:'red'}}>Color red = Role Banned</h2>
            </div>
            <form action=""autoComplete="off">
                <div className={s.updateUser}>
                <select name="newfunctions" id="" onChange={(e)=>{handleOnChange(e)}}>
                    <option value="">Change user role</option>
                    <option value="usuario">Buyer</option>
                    <option value="admin">Admin</option>
                    <option value="banned">Banned</option>
                </select>
         
            
                <input type="text"placeholder="Search user..."onChange={(e)=>handleOnChange(e)}
                name='emailInput' value={localSate.emailInput||''}/>
         
         
                <select name="email" id=""onChange={(e)=>{handleOnChange(e)}}>
                    <option value="">Select user</option>
                    {usersMostra.length>0&&usersMostra.map((e,i)=>{
                        return <option key={i} value={e.email}
                        style={{color:e.functions==='admin'?'green':e.functions==='usuario'?'blue':'red'}}
                        >{e.email}
                        
                        
                        </option>
                    })}
                </select>
                </div>
                    </form>
            
        
                <button className={s.button} onClick={(e)=>{handleOnClick(e)}}>Submit</button>
     
          
        </div>
    )
}