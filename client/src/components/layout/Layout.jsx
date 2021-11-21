import React, { useEffect, useState } from 'react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import SubHeader from './SubHeader'
import '../../styles/layout.scss';
import { Breadcrumb } from 'react-bootstrap'

function Layout(props) {


    useEffect(() => {
       
    }, [])

    return (
        <div className="main-layout">

            {/* <Header />
            <SubHeader /> */}
            {props.component}
            <Footer />
        </div>
    )
}

export default Layout
