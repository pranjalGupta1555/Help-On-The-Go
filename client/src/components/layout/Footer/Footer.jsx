import React from 'react';
import './footer.scss';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';


function Footer() {
    return (
        <div className="main-footer">
            <div className="left-footer">
                <div className="left-footer-content">
                    <ul>
                        <li>
                            About Us
                        </li>
                        <li>
                            Contact Us
                        </li>
                        <li>
                            Privacy &amp; Conditions
                        </li>
                        <li>
                            &copy; Copyright 2021, Web Design 6150 Northeastern University
                        </li>
                    </ul>
                </div>
            </div>

            <div className="right-footer">
                <div>
                    Connect with us on 
                </div>
                <div className="icons">
                    <FaFacebook />
                    <FaLinkedinIn />
                    <FaInstagram />
                    <FaTwitter />
                </div>
            </div>
        </div>
    )
}

export default Footer
