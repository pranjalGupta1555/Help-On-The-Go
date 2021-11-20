import React from 'react'
import './buttons.scss';

function CustomButton(props) {
    console.log(props.variant);
    
    return (
        <>
            <button className={props.variant}> { props.text } </button>
        </>
    )
}

export default CustomButton
