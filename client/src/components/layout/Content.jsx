import React, { useEffect, useState } from 'react';
import { Card, Button, Dropdown } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import '../../styles/content.scss';

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
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="data:image/jpeg;base64,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" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <Button variant="success" key={index} onClick={(e) => { 
                                        e.preventDefault();
                                        handleDomainClick(item.service)
                                    }}>Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </div>)
                    })
                }
            </div>

           
        </div>
    )
}

export default Content
