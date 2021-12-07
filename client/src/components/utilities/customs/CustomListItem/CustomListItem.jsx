import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Loader from '../../Loader';
import configuration from '../../../../config';
import './CustomListItem.scss';

function CustomListItem(props){
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true);
    console.log(props)
    useEffect(()=>{
        fetch(`${configuration.URL}/upload/${props.item.id}`, {
            method: 'GET',
        }).then((response) => {
            if(response.status === 200) {
                response.blob().then(blobResponse => {
                    let data = URL.createObjectURL(blobResponse);
                    console.log(data);
                    setImage(data);
                    setLoading(false);
                })
            } else {
                setImage(null);
                setLoading(false);
            }
            
        })
    });
    if(!loading){
        return(
            <Card className="w-30rem">
                <Card.Body>
                    <Card.Title>{props.item.firstName} {props.item.lastName}</Card.Title>
                    <div className="help-details">
                        <Card.Img className="fixListImage" variant="top" src={image}/> 
                        <div className="help-description">
                            <Card.Subtitle className="help-person">
                                Help Details:
                            </Card.Subtitle>
                            <Card.Text>
                                Date: {props.item.createdDate}
                            </Card.Text>
                            <Card.Text>
                                Domain: {props.item.domainName}
                            </Card.Text>
                            <Card.Text>
                                Skill: {props.item.skillName}
                            </Card.Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
    else{
        return(
        <Loader></Loader>)
    }
}

export default CustomListItem;