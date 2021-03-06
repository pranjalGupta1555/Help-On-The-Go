import { response } from 'express';
import * as orderService from '../services/order.service.js';
import * as userService from '../services/user.service.js';
import * as ProfileService from "../services/profile.service.js";

// this function gets called whenever error is occured and sets the response code to 500
const errorhandler = (message, response) => {
    response.status(500);
    response.json({ error: message });
}

// this function sets the response from the data passed to it
const setSuccessResponse = (data, response) => {
    response.status(200);
    response.json(data);
}

// this function sets the response from the data passed to it
const successHandler = (message, data, res) => {
    res.status(200).json({ message: message, data: data });
}

// this is used to fetch all the Orders from the Orders Service
export const getAllOrders = async(request, response) => {
    try {
        const order = await orderService.getAllOrders();
        setSuccessResponse(order, response);
    } catch (e) {
        errorhandler(e.message, response);
    }
};

// this is used to fetch only 1 particular Order from the Orders Service
export const getOrderById = async(request, response) => {
    try {
        const id = request.params.id;
        const order = await orderService.getOrderById(id);
        setSuccessResponse(order, response);
    } catch (e) {
        errorhandler(e.message, response);
    }
};

export const updateOrderById = async(request, response) => {
    try {

        const result = await orderService.updateOrderById(request);

        if (result !== null) {
            successHandler("success", result, response);
        } else {
            errorHandler("failed", response);
        }

    } catch (err) {
        errorHandler(err.message, response);
    }
}

export const getAllHelpersForSeeker = async(request, response) => {
    try {
        const seekerId = request.params.id;
        const result = await orderService.getAllHelpersForASeeker(seekerId);
        let helpers = [];
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
            const helper = await userService.userInfo(result[i].helperId);
            // const image = await ProfileService.getUserImage("61ae711b497e459c86b48f89");
            helpers.push({
                helper: helper,
                helperDomain: result[i].helperDomain,
                helperSkill: result[i].helperSkill,
                orderId: result[i].orderId,
                rating: result[i].rating,
                // profileImage: image
            });
        }
        successHandler("success", helpers, response);
    } catch (err) {
        errorHandler(err.message, response);
    }
};

// accumulates all the reviews and rating information of given helper by helperID passed as a request
export const getAllReviewInfoByHelperId = async(request, response) => {
    try {
        const helperId = request.params.id;
        let allReviewInfoOfHelper = await orderService.getAllReviewInfoOfHelper(helperId);
        const reviewsArray = allReviewInfoOfHelper.reviews;
        let updatedReviewsArray = [];
        reviewsArray.map(async(reviewItem, index) => {
            const seekerInfo = await userService.checkExistingUserID(reviewItem.seekerId);
            updatedReviewsArray.push({
                review: reviewItem.review,
                rating: reviewItem.rating,
                seekerId: reviewItem.seekerId,
                seekerFirstName: seekerInfo.firstName,
                seekerLastName: seekerInfo.lastName,
                seekerProfilePage: seekerInfo.profileImage
            });
            if (index == reviewsArray.length - 1) {
                allReviewInfoOfHelper.reviews = updatedReviewsArray;
                setSuccessResponse(allReviewInfoOfHelper, response);
            }
        });
    } catch (e) {
        errorhandler(e.message, response);
    }
}

export const getSeekerInfoByHelperId = async(request, response) => {
    try {
        const helperId = request.params.helperId;
        const allOrdersOfHelper = await orderService.getAllOrdersOfAHelper(helperId);
        let allSeekersByHelper = [];
        allOrdersOfHelper.map(async(orderItem, index) => {

            // gets the seeker information by seeker ID for each order with given helper ID
            const seekerInfo = await userService.checkExistingUserID(orderItem.seekerId);

            // pushes the seeker information for each order along with corresponding order details
            allSeekersByHelper.push({
                id:seekerInfo.id,
                firstName: seekerInfo.firstName,
                lastName: seekerInfo.lastName,
                profileImageURL: seekerInfo.profileImage,
                domainName: orderItem.domainName,
                skillName: orderItem.skillName,
                createdDate: orderItem.createdDate
            });
            if (index == allOrdersOfHelper.length - 1) {
                setSuccessResponse(allSeekersByHelper, response);
            }
        })
    } catch (e) {
        errorhandler(e.message, response);
    }
}

export const addNewOrder = async(request, response) =>{
    try{
        const responseMessage = await orderService.addNewOrder({...request.body});
        if(responseMessage!=null){
            setSuccessResponse(responseMessage,response);
        }else{
            errorHandler(responseMessage,response);
        }
    } catch(e){
        errorHandler(e.message,response)
    }
}