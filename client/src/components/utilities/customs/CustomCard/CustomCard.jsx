import React from 'react'
import { Card, Button, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import './CustomCard.scss'


function CustomCard(props) {
    const navigate = useHistory();
    const handleDomainClick=()=>{
        navigate.push("/seek/61a0f9d110cdb5b2e03a4995") //the id will be extracted from the props once the search flow is done
    }
    return (
        <Card className="w-25rem">
            <Card.Img className="fixImageSize" variant="top" src={props.imagePath} />
            <Card.Body>
                <Card.Title>{props.cardTitle}</Card.Title>
                <Card.Text>
                    {props.cardDescription}
                </Card.Text>
                <Button variant="success" key={props.index} onClick={(e) => {
                    e.preventDefault();
                    handleDomainClick()
                }}>Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

CustomCard.propTypes = {
    cardTitle: PropTypes.string,
    cardDescription: PropTypes.bool,
    imagePath: PropTypes.string,
    children: PropTypes.node,
};

export default CustomCard
