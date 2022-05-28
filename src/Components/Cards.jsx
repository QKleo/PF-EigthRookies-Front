
import s from '../Global.module.css';


export default function Cards(props){
    

    return(
        <div>
            
            
            <div >
                <h4 >{props.name}</h4>
                <img src={props.image} alt="kk" width={'300'} height={"200"}/>
                <h4>{props.price}</h4>
                
            </div>


        </div>
    )

}