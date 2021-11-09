import React, { useEffect } from 'react';
import '../../styles/subheader.scss';

function SubHeader() {
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


    useEffect(() => {
        window.addEventListener('scroll', function () {
            let header = document.querySelector('.main-sub-header');
            let windowPosition = window.scrollY > 0;
            header.classList.toggle('scrolling-active-sub', windowPosition);
        })

    }, [])

    return (
        <div className="main-sub-header">
            <nav className="menu">
                {navItems.map((item, index) => {
                    return (
                        <li>
                            <a href={item.itemLink} service={item.service}> {item.item} </a>
                        </li>
                    )
                })}
            </nav>
        </div>
    )
}

export default SubHeader
