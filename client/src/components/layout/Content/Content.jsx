import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import './content.scss';
import CustomCard from '../../utilities/customs/CustomCard/CustomCard';

function Content(props) {
    
   const [heading, setheading] = useState("");
   const [loading, setloading] = useState(true)

    const services = [{
        service: "Service 1",
        description: "Random description",
    }, {
        service: "Service 1",
        description: "Random description",
    }, {
        service: "Service 1",
        description: "Random description",
    }, {
        service: "Service 1",
        description: "Random description",
    }, {
        service: "Service 1",
        description: "Random description",
    }, {
        service: "Service 1",
        description: "Random description",
    }, {
        service: "Service 1",
        description: "Random description",
    }]

    const { state } = useLocation();
    const history = useHistory();

    const handleDomainClick = (serve) => {
        history.push({
            pathname: "seek",
            state: {
                serve: serve
            }
        })
    }

    useEffect(() => {
        console.log(state);
        if(state) {
            const { service } =  state;
            setheading(service)
        }

    
    }, [state])

    return (
        <div className="content-body">
            <h1> {heading ? heading : "What are you looking for today?"} </h1>
            <h4> We provide the below services </h4>
            {/* list of all the services under the service asked or domain chosen */}

            
            <div className="content-services">
                {
                    services.map((item, index) => {
                        return (<div className="content-services-service">
                            <CustomCard index={index} service={item.service} handleDomainClick={handleDomainClick} >

                            </CustomCard>
                        </div>)
                    })
                }
            </div>

           
        </div>
    )
}

export default Content
