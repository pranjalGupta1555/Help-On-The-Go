import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import './content.scss';
import CustomCard from '../../utilities/customs/CustomCard/CustomCard';
import configuration from '../../../config';
import { FaArrowCircleDown } from 'react-icons/fa';
import Loader from '../../utilities/Loader';
import { useStateValue } from '../../../Store/StateProvider';

function Content(props) {

    const [heading, setheading] = useState("");
    const [loading, setloading] = useState(true);
    const [servicesToDisplay, setServicesToDisplay] = useState([]);
    const [laodAll, setlaodAll] = useState(false);

    const[{ userCredentials }, dispatch] = useStateValue();

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
        setloading(true);
        fetch(`${configuration.URL}/domains`)
            .then((response) => response.json())
            .then((domains) => {
                let servicesArray = [];
                if (serviceSelected === '') {
                    domains.map((item, index) => {
                        item.skills.map((skill) => {
                            if (skill.skillName != "Other") {
                                servicesArray.push(skill);
                            }
                        })
                    });

                } else {
                    domains.map((item, index) => {
                        if (item.name === serviceSelected) {
                            item.skills.map((skill) => {
                                if (skill.skillName != "Other") {
                                    servicesArray.push(skill);
                                }
                            })
                        }
                    });
                }
                setServicesToDisplay(servicesArray)
                setloading(false);
            }).catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        setloading(true);
        if (state) {
            const { service } = state;
            setheading(service);
            getAllServices(service);
        }
        else {
            getAllServices("");

        }

        return () => {
        }

    }, [state]);


    if (!loading) {
        return (
            <div className="content-body">
                <h1> {heading ? heading : "What are you looking for today?"} </h1>
                <h4> We provide the below services </h4>
                {/* list of all the services under the service asked or domain chosen */}


                <div className="content-services">
                    {
                        servicesToDisplay.map((item, index) => {
                            if (laodAll) {
                                return (<div className="content-services-service">
                                    <CustomCard index={index} imagePath={item.imagePath} cardTitle={item.skillName} service={item.service} handleDomainClick={handleDomainClick} >

                                    </CustomCard>
                                </div>)
                            } else if(laodAll === false && index < 8) {
                                return (<div className="content-services-service">
                                    <CustomCard index={index} imagePath={item.imagePath} cardTitle={item.skillName} service={item.service} handleDomainClick={handleDomainClick} >

                                    </CustomCard>
                                </div>)
                            }
                        })
                    }
                </div>
                <div onClick={() => {
                    setlaodAll(true);
                }} className="loadmore" hidden={laodAll}>
                    Load More <FaArrowCircleDown /> 
                </div>

            </div>
        )
    } else {
        return (<Loader />)
    }

}

export default Content
