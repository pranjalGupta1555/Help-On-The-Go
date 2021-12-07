import React, { useEffect, useState } from 'react';
import './header.scss';
import logo from '../../../logoBikeDark.png';
import logoLite from '../../../logoBike.png';
import CustomButton from '../../utilities/customs/CustomButton/CustomButton';
import { useHistory } from 'react-router';
import { FaComment, FaShoppingBag, FaShoppingCart, FaTools, FaUser } from 'react-icons/fa';
import { useStateValue } from '../../../Store/StateProvider';
import configuration from '../../../config';



function Header(props) {
    // state variables
    const [Icon, setIcon] = useState(logo);
    const [variant, setvariant] = useState('darkButton');
    const [profImage, setprofImage] = useState(null);

    const navigate = useHistory();

    const [{ userCredentials }, dispatch] = useStateValue();

    const showLoginPage = (e) => {
        e.preventDefault();
        console.log(props);
        props.showAdmin();
        // navigate.go();
    }

    console.log(props);
    // Route to join
    const gotoJoin = (e) => {
        e.preventDefault();
        navigate.push('/join');
    }
    // Route to userprofile
    const goToUserProfile = (e) => {
        e.preventDefault();
        navigate.push('/userprofile');
    }
    // Route to chat
    const handleChatClick = (e) => {
        e.preventDefault();
        navigate.push('/chat');
    }

    const handleServiceProvided = (e) =>{
        e.preventDefault();
        navigate.push('/serviceProvided');
    }

    const setUserProfileImage = (id) => {
        fetch(`${configuration.URL}/upload/${id}`, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'image/png'
            // }

        }).then((response) => {
            if(response.status === 200) {
                response.blob().then(blobResponse => {
                    let data = URL.createObjectURL(blobResponse);
                    console.log(data);
                    setprofImage(data);
                })
            } else {
                setprofImage(null);
            }
            
        })

    }

    const handlePreviousOrders = (e) => {
        navigate.push({
            pathname: "previousOrders",
        })
    }




    useEffect(() => {
        // To set the styling for joinee
        if (window.location.href.split("/")[3] === 'join') {
            document.body.style.backgroundColor = '#1987547a';
            setIcon(logo);
            setvariant('darkButton');
        }
        else if (window.location.href.split("/")[3] === "home" || window.location.href.split("/")[3] === "") {
            // handle scrolling
            
            window.addEventListener('scroll', function () {
                let header = document.querySelector('.main-header');
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
        }
        else {
            document.querySelector('.main-header').classList.toggle('no-scroll');
            setIcon(logoLite);
            setvariant('lightButton');

        }

        if (userCredentials.loggedIn) {
            setUserProfileImage(userCredentials.userDetails.id);
        }
    }, [userCredentials.userDetails])

    return (
        <div className="main-header">
            {/* logo */}
            <div className="main-header-icon" onClick={(e) => { navigate.push("/home") }}>
                <img src={Icon} height="70px" />
            </div>



            {/* set the display from state of the application */}
            <div className="main-header-side" hidden={props.hideSide}>
                {/* signin button */}
                {
              
                    userCredentials.loggedIn ? <div className="main-header-side-icons"> <FaComment onClick={handleChatClick} /> <FaShoppingCart />
                        <img src={profImage} width="50px" height="50px" />
                        <li className="nav__listitem">
                            <ul className="nav__listitemdrop">
                                <li onClick={goToUserProfile}>My Profile</li>
                                <li onClick={handlePreviousOrders}>My Orders</li>
                                <li onClick={handleServiceProvided}>Helps Provided</li>
                            </ul>
                        </li>
                   
                    </div> : <div className="main-header-side-signin">

                        <CustomButton variant={"outlineButton"} text="Sign In" clickFn={showLoginPage} ></CustomButton>
                    </div>

                }

                {/* join */}
                {userCredentials.userType !== 'helper' && window.location.href.split('/')[3] !== 'join' ? <div className="main-header-side-join">
                    <CustomButton variant={"darkButton"} text="Join" clickFn={gotoJoin} ></CustomButton>
                </div> : <> </>
                }
            </div>

        </div>
    )
}

export default Header