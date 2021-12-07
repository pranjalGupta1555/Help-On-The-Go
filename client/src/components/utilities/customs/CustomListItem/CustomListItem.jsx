import React from 'react';
import { Card } from 'react-bootstrap';
import './CustomListItem.scss';

function CustomListItem(props){
    return(
        <Card className="w-30rem">
            <Card.Body>
                <Card.Title>{props.item.firstName} {props.item.lastName}</Card.Title>
                <div className="help-details">
                    <Card.Img className="fixListImage" variant="top" src={props.item.profileImageUrl}/> 
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

export default CustomListItem;