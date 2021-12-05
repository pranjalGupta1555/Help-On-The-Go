import React from 'react';
import './SkillList.scss';
import shortid from 'shortid';
import CustomButton from '../utilities/customs/CustomButton/CustomButton';
// import ReactStars from "react-rating-stars-component";

const SkillList = ({ users }) => {
    if (users.length > 1) {
        return (
            <div>
                <div>
                    <div className="POcards">
                        {
                            users.map((user) => (
                                <div className="POcard">
                                    <img src={user.profileImage} alt="person Image" className="POcard-image" />
                                    <div className="POcard-content">
                                        <p className="firstp">Name : {user.firstName + ' ' + user.lastName}</p>
                                        <p>Email Id : {user.email}</p>
                                        <p>Location : {user.location}</p>
                                        <p>Wage : ${user.wage}</p>
                                    </div>
                                    <div className="POcard-info">
                                        <button className="PObutton">Order</button>
                                        <button className="PObutton">View </button>
                                    </div>
                                </div>
                            ))
                        } </div>
                </div>
            </div>
        )
    } else if (users.length == 1) {
        console.log(users);
        const user = users;
        console.log(user);
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <div className="POcards">
                                <div className="POcard">
                                    <img src={user[0].profileImage} alt="person Image" className="POcard-image" />
                                    <div className="POcard-content">
                                        <p className="firstp">Name : {users[0].firstName + ' ' + users[0].lastName}</p>
                                        <p>Email Id : {users[0].email}</p>
                                        <p>Location : {users[0].location}</p>
                                        <p>Wage : ${users[0].wage}</p>
                                    </div>
                                    <div className="POcard-info">
                                        <button className="PObutton">Order</button>
                                        <button className="PObutton">View </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    } else {
        return (<div className="seek-details-container">
            <h1>Oops......User Not Found!!!</h1>
        </div>)
    }
}

export default SkillList;