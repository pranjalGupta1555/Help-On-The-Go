import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './Administration.scss';
import Login from './Login/Login';
import Registration from './Registration/Registration';

export default function Administration(props) {

    const [showRegistration, setshowRegistration] = useState(false);

    const toggleRegistration = () => {
        setshowRegistration(true);
    }

    const toggleLogin = () => {
        setshowRegistration(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";

    }, [])

    return (
        <div className="container">
            {
                showRegistration ? <Registration setToggle={toggleLogin} /> : <Login setToggle={toggleRegistration} />
            }
        </div>
    )
}
