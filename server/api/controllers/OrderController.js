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

export const getAllReviewInfoByHelperId = async(request, response) => {
    try {
        const helperId = request.params.id;
        const allReviewInfoOfHelper = await orderService.getAllReviewInfoOfHelper(helperId);
        const reviewsArray = allReviewInfoOfHelper.reviews;
        const updatedReviewsArray = [];
        reviewsArray.map(async (reviewItem, index) => {
            const seekerInfo = await userService.checkExistingUserID(reviewItem.seekerId);
            updatedReviewsArray.push({
                review: reviewItem.review,
                seekerId: reviewItem.seekerId,
                seekerFirstName: seekerInfo.firstName,
                seekerLastName: seekerInfo.lastName,
                seekerProfilePage: seekerInfo.profileImage
            });
            if(index == reviewsArray.length-1) {
                allReviewInfoOfHelper.reviews = updatedReviewsArray;
                setSuccessResponse(allReviewInfoOfHelper, response);
            }
        });
    } catch (e) {
        errorhandler(e.message, response);
    }
}