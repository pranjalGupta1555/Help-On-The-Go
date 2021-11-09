import React, { useEffect } from 'react'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import SubHeader from './SubHeader'
import '../../styles/layout.scss';

function Layout() {

    useEffect(() => {
        window.scrollY = 2;
    
    }, [])

    return (
        <div className="main-layout">
            <Header/>
            <SubHeader/>
                <Content/>
            <Footer/>
        </div>
    )
}

export default Layout
