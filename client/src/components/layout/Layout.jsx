import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../Store/StateProvider'
import Administration from '../Administration/Administration'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import SubHeader from './Header/SubHeader'
import MenuBar from './Heropane/HeroPane'
import './layout.scss';

function Layout(props) {

    // state variables
    const [{ userCredentials }, dispatch] = useStateValue();
    const [showLogin, setshowLogin] = useState(props.showLogin);
    // handle the login pop up visibility
    const setAdminPageVisibility = () => {
        setshowLogin(true);
    }

    const hideAdminVisibility = () => {
        setshowLogin(false);
    }

    console.log(showLogin);

    useEffect(() => {

    }, [])

    // display in case of home page only
    if (props.hero) {
        return (
            <>
                <MenuBar show={props.showLogin} hideAdmin={hideAdminVisibility} showAdmin={setAdminPageVisibility} component={props.component} />
                <Footer />
            </>
        )
    } else {
        return (
            <div className="main-layout">

                <Header show={props.showLogin} hideAdmin={hideAdminVisibility} showAdmin={setAdminPageVisibility} />
                <SubHeader />

                {
                    showLogin && userCredentials.loggedIn == false ?
                        <Administration close={userCredentials.loggedIn} /> : <></>
                }
                {props.component}
                <Footer />
            </div>
        )
    }
}

export default Layout
