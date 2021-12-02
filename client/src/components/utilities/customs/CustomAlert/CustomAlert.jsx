import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function CustomAlert(props) {

    const [show, setshow] = useState(props.show);


    if(show) {
        return (
            <Alert variant={props.variant} onClose={() => setshow(false)} dismissible>
                {props.message}
            </Alert>
        )
    } else {
        return (
            <>
            </>
        )
    }
}
