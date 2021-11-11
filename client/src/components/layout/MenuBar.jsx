import React, { useEffect, useState } from 'react'
import Header from './Header'
import SubHeader from './SubHeader'
import '../../styles/menubar.scss';
import img1 from '../../assets/webdesigner.jpg';
import img2 from '../../assets/tutoring.jpg';
import img3 from '../../assets/homeService.jpg';


function MenuBar(props) {

    const [img, setimg] = useState(img1);

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

    useEffect(() => {
        
        rollImages();
        
    }, [])
    return (
        <div className="main-body-layout">
            <div>
                <div className="main-container-hero" style={{ backgroundImage: `url(${img})` }} >
                <Header/>
                <SubHeader/>
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
