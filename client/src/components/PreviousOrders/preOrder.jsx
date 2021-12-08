import React from 'react'
import './preOrder.scss'
import { useStateValue } from '../../Store/StateProvider';
import { useEffect, useState } from 'react';
import Loader from '../utilities/Loader';
import StarRatings from 'react-star-ratings';
import CustomModal from '../utilities/customs/CustomModal/CustomModal';
import CustomButton from '../utilities/customs/CustomButton/CustomButton';
import configuration from '../../config.js';

export default function PreOrder(props) {
    const [{ userCredentials }, dispatch] = useStateValue();
    const userId = userCredentials.userDetails.id;
    const [helpers, setHelpers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [individualRating, setIndividualRating] = useState(0);
    const [review, setReview] = useState('');
    const [displayModal, setDisplayModal] = useState('hide');
    const [currentSelectedOrder, setCurrentSelectedOrder] = useState('');

    //setting the post options for resquests
    const postOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    //fetching all the helperIds with other details like userName, location and wage
    const fetchHelperIds = async () => {
        console.log("HELLO HERE ---");
        const result = await fetch(`${configuration.URL}/seekerOrders/` + userId, postOptions).
            then(response => response.json())
            .then((data) => {
                console.log(data, " &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ");
                // if(data.message =)
                getimages(data.data);
            })

    }

    //fetch the images of the helpers from the database
    const getimages = (data) => {
        let orders = [];
        let resp = data;
        console.log(resp, " ********************************************");
        resp.map((profile, index) => {
            fetch(`${configuration.URL}/upload/${profile.helper._id}`, {
                method: 'GET',
            }).then((response) => {
                if (response.status === 200) {
                    response.blob().then(blobResponse => {
                        let data = URL.createObjectURL(blobResponse);
                        console.log(data, " ^^^^^^^^^^^^^^");
                        orders.push({ helper: profile, image: data })
                    })
                }

                console.log(index, " ooo ", resp.length);
                if (index === resp.length - 1) {
                    console.log(orders, " &&&&&&&&&&&&&!!!!!!!!!!!!!!!!!!!!!!!");
                    setHelpers(orders);
                   
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                }

            }).catch((err) => {
                console.log(err, " >................ ");
            })




        })
    }

    console.log(helpers, " !!!!!!");

    const changeDisplayStyle = (str, orderId) => {
        if (str == "view") {
            setCurrentSelectedOrder(orderId);
            setDisplayModal("display");
        }
        else if (str == "close") {
            setDisplayModal("hide");
        }
    }

    const sendReview = (orderId, formData) => {
        fetch(`${configuration.URL}/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json())
            .then((data) => {
                fetchHelperIds();
            }).catch((err) => {
                console.log(err);
            })
    }

    const submitReview = (orderId) => {
        let formData = {
            review: review,
            rating: individualRating
        }
        sendReview(orderId, formData);
        changeDisplayStyle("close");
    }

    const handleIndividualRatingChange = (selectedRating) => {
        setIndividualRating(selectedRating);
    }

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    }

    useEffect(async () => {
        setLoading(true);
        console.log("CAME HER");
        fetchHelperIds();

    }, []);

    if (!loading) {
        return (
            <div>
                {/* diaplaying all the helpers below */}
                <div className="PRcards">
                    {
                        helpers.map((helper) =>
                        (<div className="PRcard" key={helper._id}>
                            <img src={helper.image}
                                alt="person Image" className="POcard-image" />
                            <div className="PRcard-content">
                                {console.log(helper)}
                                <p className="firstp">Name :{helper.helper.helper.firstName + ' ' + helper.helper.helper.lastName}</p>
                                <p>Email Id : {helper.helper.helper.email}</p>
                                <p>Location : {helper.helper.helper.location}</p>
                                <p>Skill : {helper.helper.helperSkill}</p>
                            </div>
                            <div className="PRcard-info">
                                {
                                    helper.hasOwnProperty("rating") && helper.helper.rating != ''
                                        ? ''
                                        : <button onClick={(e) => { e.preventDefault(); changeDisplayStyle("view", helper.helper.orderId)}} className="PRbutton">Provide Review</button>
                                }
                            </div>
                        </div>)
                        )}
                </div>
                {
                    displayModal === 'display' && currentSelectedOrder != ''
                        ?
                        <CustomModal displayStyle={displayModal} heading="PROVIDE REVIEW" changeDisplayStyle={changeDisplayStyle}>
                            <div className="formDiv">
                                {/* review form */}
                                <label>Rating: </label>
                                <StarRatings
                                    className="m-top0"
                                    starDimension={20}
                                    starSpacing={5}
                                    rating={individualRating}
                                    changeRating={handleIndividualRatingChange}
                                    starRatedColor="blue"
                                    numberOfStars={5}
                                    name='rating'
                                />
                                <label for="desc">Review Description: </label>
                                <textarea
                                    className="m-bottom20"
                                    type="text"
                                    id="desc"
                                    name="desc"
                                    placeholder={`Write your review`}
                                    cols="50"
                                    rows="4"
                                    onChange={handleReviewChange}
                                >
                                </textarea><br></br>
                                <button name="submit" onClick={() => submitReview(currentSelectedOrder)} class="p-10">Submit</button>
                                {/* review form */}
                            </div>
                        </CustomModal> : ''
                }
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }

}