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
        const result = await fetch('http://localhost:4000/seekerOrders/' + userId, postOptions).then(response => response.json());
        setHelpers(result.data);
        setLoading(false);
        return result.data;

    }

    const changeDisplayStyle = (str, orderId) => {
        if(str == "view") {
            setCurrentSelectedOrder(orderId);
            setDisplayModal("display");
        }
        else if(str == "close"){
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
                                {
                                    helper.hasOwnProperty("rating") && helper.rating != ''
                                    ? ''
                                    : <button onClick={() => changeDisplayStyle("view", helper.orderId)} className="PRbutton">Provide Review</button>
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