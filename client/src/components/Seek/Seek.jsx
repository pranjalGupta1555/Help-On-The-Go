import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import './Seek.scss';
import SkillList from './SkillList';
import { useParams } from 'react-router-dom';

const Seek = (props) =>{
    const [responseData, setResponseData] = useState({});
    const [loading, setLoading] = useState(true);
    const id= useParams();
    useEffect(()=>{
        // fetch("http://localhost:4000/user/"+id.id).then(res=>res.json()).then((resp)=>{setResponseData(resp);setLoading(false)});
    },[])
    
    const onClickHandler = () =>{

    }
    if(!loading){
    return(
    <div className="main-container">
        <div className="seek-details-container">
            <div className="seek-details">
                <h1>
                    {responseData.data.firstName} {responseData.data.lastName}
                </h1>
                    <img src={import ('../../assets/tutoring.jpg').default} height={200} width={200}/>
            </div>
            <div className="seek-skills">
                <h2>Featured Skills:</h2>
                <ul>
                    {responseData.data.skillset.map(item=>{
                        return(<SkillList skill={item}/>)
                    })}
                </ul>
            </div>
           
        </div>
        <Button onClick={onClickHandler}>Seek Now</Button>
    </div>
)}
else{
    return(<div className="seek-details-container">
        <h1>Oops......User Not Found!!!</h1>
    </div>)
}
}

export default Seek;