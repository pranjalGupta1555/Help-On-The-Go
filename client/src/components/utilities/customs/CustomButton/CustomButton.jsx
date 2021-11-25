import React from 'react'
import './buttons.scss';

function CustomButton(props) {
    
    return (
        <>
            <button className={props.variant} onClick={props.clickFn} > { props.text } </button>
        </>
    )
}

export default CustomButton
