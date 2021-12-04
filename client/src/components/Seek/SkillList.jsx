import React from 'react';
import './SkillList.scss';
import shortid from 'shortid';
// import ReactStars from "react-rating-stars-component";

const SkillList = ({ users }) => {
    if (users.length > 1) {
        return (
            <div>
                <div>
                    {users.map((user) => (
                        <div className="card" key={shortid.generate()}>
                            <div className="imgBx">
                                <img src="https://www.stepsoftware.com/media/k2/items/cache/184b7cb84d7b456c96a0bdfbbeaa5f14_XL.jpg" />
                            </div>
                            <div className="contentBx">
                                <h2>Name : {user.firstName + ' ' + user.lastName}</h2>
                                <h2>Email Id : {user.email}</h2>
                                <h2>Location : {user.location}</h2>
                                {/* {user.skillset.map((skillset) => {
                                        console.log(skillset.skill)
                                        if(skillset.skill=='coding'){
                                            console.log('here');
                                            setRating(skillset.skill.rating);
                                        }
                                    })} */}
                                {/* { rating!=0 ? <h2>Rating : {rating}</h2> : null} */}
                                {/* {user.skills.map((skill) => (
                                        <button key={shortid.generate()} onClick={(e) => {
                                            e.preventDefault();
                                           // handletask(dom.name, skill);
                                        }}> {skill}</button>
                                    ))} */}
                                <button key={shortid.generate()} onClick={(e) => {
                                    e.preventDefault();
                                    // handletask(dom.name, skill);
                                }}> Order </button>
                                <button key={shortid.generate()} onClick={(e) => {
                                    e.preventDefault();
                                    // handletask(dom.name, skill);
                                }}> View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        )
    } else if (users.length == 1) {
        console.log(users);
        return (
            <div>
                <div>
                    <div className="card" >
                        <div className="imgBx">
                            <img src="https://www.stepsoftware.com/media/k2/items/cache/184b7cb84d7b456c96a0bdfbbeaa5f14_XL.jpg" />
                        </div>
                        <div className="contentBx">
                            <h2>Name : {users[0].firstName + ' ' + users[0].lastName}</h2>
                            <h2>Email Id : {users[0].email}</h2>
                            <h2>Location : {users[0].location}</h2>
                            {/* {user.skillset.map((skillset) => {
                                        console.log(skillset.skill)
                                        if(skillset.skill=='coding'){
                                            console.log('here');
                                            setRating(skillset.skill.rating);
                                        }
                                    })} */}
                            {/* { rating!=0 ? <h2>Rating : {rating}</h2> : null} */}
                            {/* {user.skills.map((skill) => (
                                        <button key={shortid.generate()} onClick={(e) => {
                                            e.preventDefault();
                                           // handletask(dom.name, skill);
                                        }}> {skill}</button>
                                    ))} */}
                            <h2>HourlyWage : Fetch Value</h2>
                            <button key={shortid.generate()} onClick={(e) => {
                                e.preventDefault();
                                // handletask(dom.name, skill);
                            }}> Order </button>
                            <button key={shortid.generate()} onClick={(e) => {
                                e.preventDefault();
                                // handletask(dom.name, skill);
                            }}> View Details</button>
                        </div>
                    </div>
                </div>
            </div >)
    } else {
        return (<div className="seek-details-container">
            <h1>Oops......User Not Found!!!</h1>
        </div>)
    }
}

export default SkillList;