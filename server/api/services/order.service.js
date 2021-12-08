import { response } from "express";
import Order from "../models/Order.js";
import * as UserService from "../services/user.service.js";

// Used to fetch all the orders 
export const getAllOrders = async(params = {}) => {
    const promise = await Order.find(params).exec();
    return promise;
};

// Used to fetch a particular Order 
export const getOrderById = (id) => {
    const promise = Order.findById(id).exec();
    return promise;
}

export const updateOrderById = async(req) => {
    const promise = await Order.findByIdAndUpdate({ _id: req.params.id }, {...req.body }, {
        new: true
    });
    return promise;
}

// accumulates all the reviews of a helper by going through of his/her orders
export const getAllReviewsOfHelper = async(allOrdersOfHelper) => {
    let reviewsArray = [];
    allOrdersOfHelper.map(async(order) => {
        reviewsArray.push({
            review: order.review,
            seekerId: order.seekerId,
            ...(order.rating !== undefined) && { rating: order.rating }
        });
    });
    return reviewsArray;
}

// calculates average rating of helper by going through all of his/her orders
export const getAverageRatingOfHelper = async(allOrdersOfHelper) => {
    let sumOfRatings = 0;
    let count = 0;
    allOrdersOfHelper.map((order) => {
        if (order.rating !== undefined && order.rating != '' && order.rating != null) {
            sumOfRatings = sumOfRatings + order.rating;
            count++;
        }
    });
    if (count > 0) {
        return Math.round(sumOfRatings / count);
    } else {
        return null;
    }
}

// filters out all the orders based on helper ID
// calculates average rating of helper by going through all the orders of that particular helper
// accumulates all the individual reviews of a helper into one array
export const getAllReviewInfoOfHelper = async(helperId) => {
    const allOrdersOfHelper = await Order.find({ helperId: helperId }).exec();
    let reviewsArray = [];
    let averageRating = 0;
    reviewsArray = await getAllReviewsOfHelper(allOrdersOfHelper);
    averageRating = await getAverageRatingOfHelper(allOrdersOfHelper);
    return {
        helperId: helperId,
        reviews: reviewsArray,
        averageRating: averageRating
    }
}

export const getAllHelpersForASeeker = async(seekerId) => {
    const allOrdersOfSeeker = await Order.find({ seekerId: seekerId }).exec();
    let helperIds = [];
    allOrdersOfSeeker.map((orderItem) => {
        helperIds.push({
            helperId: orderItem.helperId,
            orderId: orderItem.id,
            rating: orderItem.rating,
            helperDomain: orderItem.domainName,
            helperSkill: orderItem.skillName
        });
    })
    // allOrdersOfSeeker.map((helpers) => {
    //     helperIds.push({ helperId: helpers.helperId, helperDomain: helpers.domainName, helperSkill: helpers.skillName });
    // });
    return helperIds;
}

// filters out all the orders with given helper ID
export const getAllOrdersOfAHelper = async(helperId) => {
    const allOrdersOfHelper = await Order.find({ helperId: helperId }).exec();
    return allOrdersOfHelper;
}

export const addNewOrder = async(request) =>{
    const newOrder = new Order(request)
    const responseMessage = await newOrder.save();
    return responseMessage;
}