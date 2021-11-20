import React from 'react'
import '../../styles/customs/buttons.scss';

function CustomButton(props) {
    console.log(props.variant);
    
    return (
        <>
            <button className={props.variant}> { props.text } </button>
        </>
    )
}

export default CustomButton
