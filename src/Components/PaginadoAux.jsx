import ItemsCarousel from 'react-items-carousel';
import { useState } from 'react';

export default function PaginadoAux(props){
    let aux=[]
   // let num=props.max
   const [activeItemIndex, setActiveItemIndex] = useState(0);
   const chevronWidth = 1;
   
   
    
    for(let i=1;i<=props.max+1;i++){
        aux.push(i)
    }
    //console.log(props.max)
   

    return( 
        <div >
            <div style={{display:'flex',flexDirection:'row', marginTop:"100px", marginBottom:"70px", marginLeft:"150px" }}>
            <button onClick={()=>props.setpaginado(props.paginado-1)}>←</button>
                <div  style={{ justifyContent:'center' ,width:'60%',marginLeft:'10%',marginRight:'10%'}}>            
                <ItemsCarousel  requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={10}
                    gutter={1}
                    leftChevron={<button>{'<'}</button>}
                    rightChevron={<button>{'>'}</button>}
                    outsideChevron
                    chevronWidth={chevronWidth}>

                {aux.map(e=>{
                    return <button key={e}  onClick={()=>props.setpaginado(e-1)}
                    style={{background:e===props.paginado+1&&'blue'}}>{e}</button>
                })}
           
                </ItemsCarousel>
                </div>   
            <button onClick={()=>props.setpaginado(props.paginado+1)}>→</button>
            </div>
        <div >
           {/* Pag. {props.paginado+1}     */}
        </div>    
        </div>

    )
}