import React, { useEffect, useState } from 'react';
import '../../styles/header.scss';
import logo from '../../logoBikeDark.png';
import logoLite from '../../logoBike.png';
import CustomButton from '../utilities/CustomButton';


function Header() {

    const [Icon, setIcon] = useState(logo);
    const [variant, setvariant] = useState('darkButton');

    useEffect(() => {
        window.addEventListener('scroll', function () {
            let header = document.querySelector('.main-header, .main-header-searchbar');
            let windowPosition = window.scrollY > 0;
            header.classList.toggle('scrolling-active', windowPosition);

            if (windowPosition > 0) {
                setIcon(logoLite);
                setvariant('lightButton');
            } else {
                setIcon(logo);
                setvariant('darkButton');
            }
        })

    }, [])

    return (
        <div className="main-header">
            {/* logo */}
            <div className="main-header-icon">
                <img src={Icon} height="70px" />
            </div>

            {/* Search bar */}
            <div className="main-header-searchbar">
                <input type="search"></input>
                <CustomButton variant={variant} text="Search"></CustomButton>
            </div>
        </div>
    )
}

export default Header
