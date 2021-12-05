import React from 'react'
import { Card, Button, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import './CustomCard.scss'
import { FaArrowRight } from 'react-icons/fa';


function CustomCard(props) {
    const navigate = useHistory();
    const handleDomainClick=(skillChosen)=>{
        console.log("CAME HERE !!");
        navigate.push({ pathname: '/seek', state: {skillChosen} });
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
                    console.log("CAME HERE ");
                    e.preventDefault();
                    handleDomainClick(props.cardTitle);
                }}>Explore  <FaArrowRight /> </Button>

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
