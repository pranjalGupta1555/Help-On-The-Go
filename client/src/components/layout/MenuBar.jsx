import React, { useEffect, useState } from 'react'
import Header from './Header'
import SubHeader from './SubHeader'
import '../../styles/menubar.scss';
import img1 from '../../assets/webdesigner.jpg';
import img2 from '../../assets/tutoring.jpg';
import img3 from '../../assets/homeService.jpg';


function MenuBar() {

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
        <React.Fragment>
            <div className="main-container-hero" style={{ backgroundImage: `url(${img})` }} >
            <Header/>
            <SubHeader/>
            </div>
        </React.Fragment>
    )
}

export default MenuBar
