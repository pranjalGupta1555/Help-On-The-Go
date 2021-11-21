import React from 'react'
import '../../styles/customs/buttons.scss';

function CustomButton(props) {
    
    return (
        <>
            <button className={props.variant}> { props.text } </button>
        </>
    )
}

export default CustomButton
