import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useStateValue } from '../../StateProvider';
import './Administration.scss';
import Login from './Login/Login';
import Registration from './Registration/Registration';

export default function Administration(props) {

    const [{ userCredentials }, dispatch] = useStateValue();

    const [showRegistration, setshowRegistration] = useState(false);
    const [close, setclose] = useState(props.close);


    const toggleRegistration = () => {
        setshowRegistration(true);
    }

    const toggleLogin = () => {
        setshowRegistration(false);
    }

    const closeAdministration = () => {
        setclose(false);
        document.body.style.overflow = "auto";
    }

    console.log("CLOSE :: ", close);

    useEffect(() => {
        console.log("CALLED ADMIN");
        if(userCredentials.loggedIn) {
            window.scrollTo(0, 0);
            setTimeout(() => {
                document.body.style.overflow = "hidden";
                setclose(false);
            }, 0);
        } else {
            window.scrollTo(0, 0);
            setTimeout(() => {
                document.body.style.overflow = "hidden";
                setclose(true);
            }, 0);
        }

    }, [props.close])

    if(close) {
        return (
            <div className="container">
                {
                    showRegistration ? <Registration setToggle={toggleLogin} closeAdministration={closeAdministration} /> : <Login setToggle={toggleRegistration} closeAdministration={closeAdministration} />
                }
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}
