import React, { useEffect, useState } from 'react';
import './header.scss';
import logo from '../../../logoBikeDark.png';
import logoLite from '../../../logoBike.png';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import { useHistory } from 'react-router';
import { useStateValue } from '../../../StateProvider';
import { FaShoppingBag, FaShoppingCart, FaUser } from 'react-icons/fa';


function Header(props) {

    const [Icon, setIcon] = useState(logo);
    const [variant, setvariant] = useState('darkButton');
    const [hideSearch, sethideSearch] = useState('none');
    const navigate = useHistory();

    const [{ userCredentials }, dispatch] = useStateValue();

    const showLoginPage = (e) => {
        e.preventDefault();
        console.log(props);
        props.showAdmin();
        navigate.go();
    }

    console.log(props);

    useEffect(() => {

        if (window.location.href.split("/")[3] === "home" || window.location.href.split("/")[3] === "") {

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
        } else {
            document.querySelector('.main-header, .main-header-searchbar').classList.toggle('no-scroll');
            setIcon(logoLite);
            setvariant('lightButton');
            sethideSearch('');
        }

    }, [])

    return (
        <div className="main-header">
            {/* logo */}
            <div className="main-header-icon" onClick={(e) => { navigate.push("/home") }}>
                <img src={Icon} height="70px" />
            </div>

            {/* Search bar */}
            <div className="main-header-searchbar" style={{ display: hideSearch }}>
                <input type="search" ></input>
                <CustomButton variant={variant} text="Search"></CustomButton>
            </div>

            {/* set the display from state of the application */}
            <div className="main-header-side" hidden={props.hideSide}>
                {/* signin button */}
                {
                    userCredentials.loggedIn ? <div className="main-header-side-icons"> <FaShoppingCart /> <FaUser /> </div> : <div className="main-header-side-signin">
                        <CustomButton variant={"outlineButton"} text="Sign In" clickFn = {showLoginPage} ></CustomButton>
                    </div>

                }

                {/* join */}
                <div className="main-header-side-join">
                    <CustomButton variant={"darkButton"} text="Join" ></CustomButton>
                </div>
            </div>

        </div>
    )
}

export default Header
