import React, { useEffect, useState } from 'react'
import Content from './Content/Content'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import SubHeader from './Header/SubHeader'
import './layout.scss';

function Layout(props) {


    useEffect(() => {
       
    }, [])

    return (
        <div className="main-layout">

            <Header />
            <SubHeader />
            {props.component}
            <Footer />
        </div>
    )
}

export default Layout
