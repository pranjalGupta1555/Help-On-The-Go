import React from 'react'
import { useHistory } from 'react-router-dom';
import './buttons.scss';

function CustomButton(props) {

    const navigate = useHistory();
    const navigateSignInJoinPage = ()=>{
        if(props.text==="Join"){
            navigate.push("/signUp")
        }
        else{
            navigate.push("/signIn")
        }
    }
    
    return (
        <>
            <button className={props.variant} onClick={navigateSignInJoinPage} > { props.text } </button>
        </>
    )
}

export default CustomButton
