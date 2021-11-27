import React from 'react';
import './SkillList.scss';
import ReactStars from "react-rating-stars-component";

const SkillList = (props) => {
    return (
        <li>
            <div className="skill-details">
                <div className="skill-name">
                    <p>{props.skill.skill}</p>
                </div>
                <div className="skill-price">
                    <pre> Charges:${props.skill.charge}/hour</pre>
                </div>
                <div className="skill-ratings">
                    <ReactStars count={props.skill.rating}
                        size={18}
                        color="#ffd700"
                        activeColor="#ffd700"/>
                </div>
            </div>
        </li>
    )
}

export default SkillList;