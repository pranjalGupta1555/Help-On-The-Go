import React from 'react'
import './preOrder.scss'
import { useStateValue } from '../../Store/StateProvider';
import { useEffect, useState } from 'react';
import Loader from '../utilities/Loader';

const PreOrder = () => {
    const [{ userCredentials }, dispatch] = useStateValue();
    const userId = userCredentials.userDetails.id;
    const [helpers, setHelpers] = useState([]);
    const [loading, setLoading] = useState(true);

    const postOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const fetchHelperIds = async () => {
        const result = await fetch('http://localhost:4000/seekerOrders/' + userId, postOptions).then(response => response.json());
        setHelpers(result.data);
        setLoading(false);
        return result.data;

    }

   

    useEffect(async () => {
        setLoading(true);
        fetchHelperIds();
    }, []);

    if (!loading) {
        return (
            <div>
                {/* <OrderList users = {helpers}/> */}
                <div className="PRcards">
                    {
                        helpers.map((helper) =>
                        (<div className="PRcard" key={helper._id}>
                            <img src={helper.profileImage} alt="person Image" className="POcard-image" />
                            <div className="PRcard-content">
                                <p className="firstp">Name :{helper.firstName + ' ' + helper.lastName}</p>
                                <p>Email Id : {helper.email}</p>
                                <p>Location : {helper.location}</p>
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
