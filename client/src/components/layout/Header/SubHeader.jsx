import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import configuration from '../../../config';

import './subheader.scss';

function SubHeader() {

    const history = useHistory();
    const [domains, setDomains] = useState([]);

    const hitService = (link, servicePass) => {
        history.push({
            pathname: link,
            state: { service: servicePass }
        });
        console.log("came");
        // window.location.href = link;
    }

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
            });
    }

    useEffect(() => {

        handleScroll();
        getAllDomains();

        return () => {
            handleScroll();
        }

    }, [])


    return (
        <div className="main-sub-header">
            <nav className="menu">
                {domains.map((item, index) => {
                    return (
                        <li key={index} onClick={(e) => { e.preventDefault();
                            hitService("/services", item.name) }}>
                             {item.name} 
                        </li>
                    )
                })}
            </nav>
        </div>
    )
}

export default SubHeader
