import React from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import './CustomModal.scss';


function CustomModal(props) {
    const navigate = useHistory();
    const handleDomainClick=(skillChosen)=>{
        console.log("CAME HERE !!");
        navigate.push({ pathname: '/seek', state: {skillChosen} });
    }
    return (
        <div id="myModal" className={`modal ${props.displayStyle}`}>
            <div className="modal-content">
              <a onClick={() => props.changeDisplayStyle("close")}><span className="close">&times;</span></a>
              <h1>{props.heading}</h1>
              {props.children}
                
            </div>
         </div>
    )
}

CustomModal.propTypes = {
    cardTitle: PropTypes.string,
    cardDescription: PropTypes.bool,
    imagePath: PropTypes.string,
    children: PropTypes.node,
};

export default CustomModal
