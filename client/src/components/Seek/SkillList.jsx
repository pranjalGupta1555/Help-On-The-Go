import React from 'react';
import './SkillList.scss';
import shortid from 'shortid';
import CustomButton from '../utilities/customs/CustomButton/CustomButton';
import { useHistory } from 'react-router-dom';
import configuration from '../../config';
// import ReactStars from "react-rating-stars-component";

const SkillList = ({ selectedDomain, selectedSkill, showAdmin, updateChatId, userCredentials,  users }) => {
    const navigate = useHistory();
    const handleOrderClick = (user) => {
        if (!userCredentials.loggedIn) {
            alert("Login function here!!")
        }
        else {
            console.log(user);
            fetch(`${configuration.URL}/newOrder`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "seekerId":userCredentials.userDetails.id,
                    "helperId": user.id,
                    "interactionId":"dscx",
                    "skillName":selectedSkill,
                    "domainName":selectedDomain,
                    "createdDate": new Date()
                })
            });
            fetch(`${configuration.URL}/chat/${userCredentials.userDetails.username}/${user.username}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((response) => response.json())
                .then((data) => {
                    updateChatId(data.data.chatId)
                    navigate.push('/chat');
         });
        }
    }

    const handleViewClick = (helperId) => {
        if (!userCredentials.loggedIn) {
            alert("Login function here!!")
        }
        else {
            navigate.push(`/viewHelperProfile/${helperId}`);
        }
    }

    if (users.length > 1) {
        return (
            <div>
                <div>
                    <div className="POcards">
                        {
                            users.map((user) => (
                                <div className="POcard">
                                    <img src={user.profileImageURL} alt="person Image" className="POcard-image" />
                                    <div className="POcard-content">
                                        <p className="firstp">Name : {user.firstName + ' ' + user.lastName}</p>
                                        <p>Email Id : {user.email}</p>
                                        <p>Location : {user.location}</p>
                                        <p>Wage : ${user.wage}</p>
                                    </div>
                                    <div className="POcard-info">
                                        <button className="PObutton" onClick={() => { handleOrderClick(user) }}>Order</button>
                                        <button className="PObutton" onClick={() => { handleViewClick(user._id) }}>View </button>
                                    </div>
                                </div>
                            ))
                        } </div>
                </div>
            </div>
        )
    } 
     //displaying when we get a single uesr with userName, image, email and location
    else if (users.length == 1) {
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
                                        <button className="PObutton" type="button" onClick={() => { handleOrderClick(user[0]) }}>Order</button>
                                        <button className="PObutton" type="button" onClick={console.log("here")}>View </button>
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
            {/* //displaying when we have no users */}
            <h1>Oops......User Not Found!!!</h1>
        </div>)
    }
}

export default SkillList;