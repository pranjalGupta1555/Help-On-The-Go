import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useStateValue } from '../../Store/StateProvider';
import './Administration.scss';
import Login from './Login/Login';
import Registration from './Registration/Registration';

export default function Administration(props) {

    const [{ userCredentials }, dispatch] = useStateValue();

    const [showRegistration, setshowRegistration] = useState(false);
    const [close, setclose] = useState(props.close);

    const history = useHistory();

    const toggleRegistration = () => {
        setshowRegistration(true);
    }

    const toggleLogin = () => {
        setshowRegistration(false);
    }

    const hideAdministration = () => {
        setclose(true);
        document.body.style.overflow = "auto";
    }

    const closeAdministration = () => {
        setclose(false);
        document.body.style.overflow = "auto";
        history.go();
    }

    console.log("CLOSE :: ", close);

    useEffect(() => {
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
                    showRegistration ? <Registration setToggle={toggleLogin} closeAdministration={closeAdministration} /> : <Login setToggle={toggleRegistration} hideAdministration={hideAdministration} closeAdministration={closeAdministration} />
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
