import React, { useEffect, useState } from 'react';
import './ServiceProvided.scss'
import configuration from '../../config';
import CustomListItem from '../utilities/customs/CustomListItem/CustomListItem';

function ServiceProvided(props){
    const [helpData, setHelpData]= useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        console.log("inside service provider");
        fetch(`${configuration.URL}/serviceProvidedHistory/${props.userDetails._id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setHelpData(data);
        }).then(setLoading(false));
    },[])
    if(!loading){
        return(
            <div className="service-provided-container">
                <h1>Helps Provided By Me:</h1>
                <ul>
                    {helpData.map((item,index)=>{
                        return(<CustomListItem item={item}/>)
                    })
                    }
                </ul>
            </div>
        )
    }else{
        return(<h2>Loading......</h2>)
    }
} 

export default ServiceProvided;
