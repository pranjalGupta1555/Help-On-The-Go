import React, { useEffect, useState } from 'react';
import '../../styles/header.scss';
import logo from '../../logoBikeDark.png';
import logoLite from '../../logoBike.png';
import CustomButton from '../utilities/CustomButton';


function Header() {

    const [Icon, setIcon] = useState(logo);
    const [variant, setvariant] = useState('darkButton');
    const [hideSearch, sethideSearch] = useState('none');

    useEffect(() => {
        window.addEventListener('scroll', function () {
            let header = document.querySelector('.main-header, .main-header-searchbar');
            let windowPosition = window.scrollY > 0;
            header.classList.toggle('scrolling-active', windowPosition);

            if (windowPosition > 0) {
                setIcon(logoLite);
                setvariant('lightButton');
                sethideSearch('');
            } else {
                setIcon(logo);
                setvariant('darkButton');
                sethideSearch('none');
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
            <div className="main-header-searchbar" style={{ display: hideSearch }}>
                <input type="search" ></input>
                <CustomButton variant={variant} text="Search"></CustomButton>
            </div>

{/* set the display from state of the application */}
        <div className="main-header-side">
            {/* signin button */}
            <div className="main-header-side-signin">
                <CustomButton variant={"outlineButton"} text="Sign In" ></CustomButton>
            </div>

            {/* join */}
            <div className="main-header-side-join">
                <CustomButton variant={"darkButton"} text="Join" ></CustomButton>
            </div>
        </div>

        </div>
    )
}

export default Header
