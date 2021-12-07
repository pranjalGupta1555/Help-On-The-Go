import { response } from 'express';
import * as orderService from '../services/order.service.js';
import * as userService from '../services/user.service.js';

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

const errorHandler = (message, res) => {
    res.status(400).json({ error: message });
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

        if(result !== null) {
            successHandler("success", result, response);
        } else {
            errorHandler("failed", response);
        }

    } catch(err) {
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
            // let helper = await userService.userInfo(result[i].helperID);
            // helpers.push({...helper.toObject(), 
            //     orderId: result[i].orderID, 
            //     rating: result[i].rating});
            // console.log(result[i].helperId, result[i].domainName, result[i].skillName);
            const helper = await userService.userInfo(result[i].helperId);
            helpers.push({ 
                helper: helper, 
                helperDomain: result[i].helperDomain, 
                helperSkill: result[i].helperSkill,
                orderId: result[i].orderId,
                rating: result[i].rating
            });
        }
        successHandler("success", helpers, response);
    } catch (err) {
        errorHandler(err.message, response);
    }
};


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
            const seekerInfo = await userService.checkExistingUserID(orderItem.seekerId);
            allSeekersByHelper.push({
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