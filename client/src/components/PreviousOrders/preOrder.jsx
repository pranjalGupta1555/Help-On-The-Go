import React from 'react'
import './preOrder.scss'
import { useStateValue } from '../../Store/StateProvider';
import { useEffect, useState } from 'react';
import Loader from '../utilities/Loader';
// import configuration from '../../../config';

const PreOrder = () => {
    const [{ userCredentials }, dispatch] = useStateValue();
    const userId = userCredentials.userDetails.id;
    const [helpers, setHelpers] = useState([]);
    const [loading, setLoading] = useState(true);

    //setting the post options for resquests
    const postOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    //fetching all the helperIds with other details like userName, location and wage
    const fetchHelperIds = async () => {
        const result = await fetch('http://localhost:4000/seekerOrders/' + userId, postOptions).then(response => response.json());
        setHelpers(result.data);
        setLoading(false);
        return result.data;

    }

    // const getUserProfileImage = (id) => {
    //     fetch(`${configuration.URL}/upload/${id}`, {
    //         method: 'GET',
    //     }).then((response) => {
    //         if (response.status === 200) {
    //             response.blob().then(blobResponse => {
    //                 let data = URL.createObjectURL(blobResponse);
    //                 console.log(data);
    //                 //setprofImage(data);
    //             })
    //         } else {
    //             //setprofImage(null);
    //         }

    //     })

    // }

    useEffect(async () => {
        setLoading(true);
        fetchHelperIds();
    }, []);

    if (!loading) {
        return (
            <div>
                {/* diaplaying all the helpers below */}
                <div className="PRcards">
                    {
                        helpers.map((helper) =>
                        (<div className="PRcard" key={helper.helper._id}>
                            <img src={helper.profileImage} alt="person Image" className="POcard-image" />
                            <div className="PRcard-content">
                                <p className="firstp">Name :{helper.helper.firstName + ' ' + helper.helper.lastName}</p>
                                <p>Email Id : {helper.helper.email}</p>
                                <p>Location : {helper.helper.location}</p>
                                <p>Domain : {helper.helperDomain}</p>
                                <p>Skill : {helper.helperSkill}</p>
                            </div>
                            <div className="PRcard-info">
                                <button className="PRbutton">Provide Review</button>
                            </div>
                        </div>)
                        )}
                </div>
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }

}

export default PreOrder
