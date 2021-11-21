import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../../styles/subheader.scss';

function SubHeader() {
    
    const history = useHistory();

    const navItems = [{
        "item": "IT Services",
        "itemLink": "/services",
        "service": "IT"
    }, {
        "item": "Tutor",
        "itemLink": "/services",
        "service": "tutor"
    }, {
        "item": "Designing",
        "itemLink": "/services",
        "service": "designing"
    }, {
        "item": "Home Decor",
        "itemLink": "/services",
        "service": "decor"
    }]


    const hitService = (link, servicePass) => {
        history.push({ 
            pathname: link,
            state: { service: servicePass } });
        // window.location.href = link;
    }

    const handleScroll = () => {
        if(window.location.href.includes("home") ) {
            window.addEventListener('scroll', function () {
                let header = document.querySelector('.main-sub-header');
                let windowPosition = window.scrollY > 0;
                header.classList.toggle('scrolling-active-sub', windowPosition);
            })
        } else {
            document.querySelector('.main-sub-header').classList.toggle('no-scroll-sub');
        }
    }

    useEffect(() => {

        handleScroll();

        return () => {
            handleScroll();
        }
        
    }, [])

   
    return (
        <div className="main-sub-header">
            <nav className="menu">
                {navItems.map((item, index) => {
                    return (
                        <li key={index} onClick={(e) => { e.preventDefault();
                            hitService(item.itemLink, item.service) }}>
                             {item.item} 
                        </li>
                    )
                })}
            </nav>
        </div>
    )
}

export default SubHeader
