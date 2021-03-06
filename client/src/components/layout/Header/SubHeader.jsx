import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import configuration from '../../../config';
import Loader from '../../utilities/Loader';

import './subheader.scss';

function SubHeader() {

    // states 
    const history = useHistory();
    const [domains, setDomains] = useState([]);
    const [loading, setloading] = useState(true);

    // Hit the service provider
    const hitService = (link, servicePass) => {
        history.push({
            pathname: link,
            state: { service: servicePass }
        });

    }
    // scroll bar settings 
    const handleScroll = () => {
        if (window.location.href.split("/")[3] === 'join') {
            document.body.style.backgroundColor = '#1987547a';
            document.querySelector('.main-sub-header').style.display = 'none';
        } if (window.location.href.split("/")[3] === "home" || window.location.href.split("/")[3] === "") {
            window.addEventListener('scroll', function () {
                let header = document.querySelector('.main-sub-header');
                let windowPosition = window.scrollY > 0;
                header.classList.toggle('scrolling-active-sub', windowPosition);
            })
        } else {
            document.querySelector('.main-sub-header').classList.toggle('no-scroll-sub');
        }
    }

    const getAllDomains = () => {
        fetch(`${configuration.URL}/domains`)
            .then((response) => response.json())
            .then((data) => {
                setDomains(data);
                setloading(false)
            });
    }

    useEffect(() => {
        setloading(true)
        handleScroll();
        getAllDomains();

        return () => {
            handleScroll();
        }

    }, [])
    if (!loading) {
        return (
            <div className="main-sub-header">
                <nav className="menu">
                    {/* display the domains on sub header */}
                    {domains.map((item, index) => {
                        return (
                            <li key={index} onClick={(e) => {
                                e.preventDefault();
                                hitService("/services", item.name)
                            }}>
                                {item.name}
                            </li>
                        )
                    })}
                </nav>
            </div>
        )
    } else {
        return (
            <div className="main-sub-header">

            </div>
        )
    }
}

export default SubHeader
