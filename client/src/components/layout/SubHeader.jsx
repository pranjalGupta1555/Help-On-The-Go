import React, { useEffect } from 'react';
import '../../styles/subheader.scss';

function SubHeader() {

    useEffect(() => {
        window.addEventListener('scroll', function () {
            let header = document.querySelector('.main-sub-header');
            let windowPosition = window.scrollY > 0;
            header.classList.toggle('scrolling-active-sub', windowPosition);
        })
    
    }, [])

    return (
        <div className="main-sub-header">
            
        </div>
    )
}

export default SubHeader
