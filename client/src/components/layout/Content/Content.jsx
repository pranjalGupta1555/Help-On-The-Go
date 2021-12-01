import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import './content.scss';
import CustomCard from '../../utilities/customs/CustomCard/CustomCard';
import configuration from '../../../config';

function Content(props) {
    
   const [heading, setheading] = useState("");
   const [loading, setloading] = useState(true);
   const [servicesToDisplay, setServicesToDisplay] = useState([]);

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

    const getAllServices = (serviceSelected) => {
        fetch(`${configuration.URL}/domains`)
            .then((response) => response.json())
            .then((domains) => {
                let servicesArray = [];
                domains.map((item, index) => {
                        item.skills.map((skill) => {
                            if(skill.skillName != "Other") {
                                servicesArray.push(skill);
                            }
                        })
                });
                populateServicesToDisplay(servicesArray, serviceSelected, domains);
            });
    }

    const populateServicesToDisplay = (servicesArray, serviceSelected, domains) => {
        if(serviceSelected === "") {
            setServicesToDisplay(servicesArray);
        }
        else {
            domains.map((item, index) => {
                if(serviceSelected === item.name) {
                    let servicesArray = [];
                    item.skills.map((skill) => {
                        if(skill.skillName != "Other") {
                            servicesArray.push(skill);
                        }
                    })
                    setServicesToDisplay(servicesArray);
                }
            })
        }
    }

    useEffect(() => {
        if(state) {
            const { service } =  state;
            setheading(service);
            getAllServices(service);
        }
        else {
            getAllServices("");

        }
    }, [state])

    return (
        <div className="content-body">
            <h1> {heading ? heading : "What are you looking for today?"} </h1>
            <h4> We provide the below services </h4>
            {/* list of all the services under the service asked or domain chosen */}

            
            <div className="content-services">
                {
                    servicesToDisplay.map((item, index) => {
                        return (<div className="content-services-service">
                            <CustomCard index={index} imagePath={item.imagePath} cardTitle={item.skillName} service={item.service} handleDomainClick={handleDomainClick} >

                            </CustomCard>
                        </div>)
                    })
                }
            </div>

           
        </div>
    )
}

export default Content
