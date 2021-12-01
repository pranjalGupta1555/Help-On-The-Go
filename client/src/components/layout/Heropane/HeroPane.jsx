import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import SubHeader from '../Header/SubHeader'
import './heropane.scss';
import img1 from '../../../assets/webdesigner.jpg';
import img2 from '../../../assets/tutoring.jpg';
import img3 from '../../../assets/homeService.jpg';
import Administration from '../../Administration/Administration';
import { useStateValue } from '../../../StateProvider';
import { useHistory } from 'react-router';


function MenuBar(props) {


    const [{userCredentials}, dispatch] = useStateValue();
    const [img, setimg] = useState(img1);
    const [showLogin, setshowLogin] = useState(props.show);

    const history = useHistory();

    const rollImages = () => {
        setInterval(() => {
            setimg(img2);
        }, 5000);

        setInterval(() => {
            setimg(img3);
        }, 15000);

        setInterval(() => {
            setimg(img1);
        }, 10000);
    }


    const setAdminVisible = () => {
        console.log("HEROPANE");
        setshowLogin(true);
        // history.go();
    }

    
    const hideAdminVisible = () => {
        console.log("HEROPANE hide");
        setshowLogin(false);
    }

    useEffect(() => {

        rollImages();

    }, [])

    return (
        <div className="main-body-layout">
            <div>
                <div className="main-container-hero" style={{ backgroundImage: `url(${img})` }} >
                    <Header showAdmin={setAdminVisible} hideAdmin={hideAdminVisible} />
                    <SubHeader />
                    {
                        showLogin && userCredentials.loggedIn == false ?
                            <Administration close={userCredentials.loggedIn} /> : <></>
                    }
                </div>

                <div className="title">
                    <h1> Help On The Go </h1>

                    <div className="subtitle">
                        Your one stop solution to almost everything!
                    </div>
                </div>
            </div>
            {/* body */}

            {props.component}


        </div>
    )
}

export default MenuBar
