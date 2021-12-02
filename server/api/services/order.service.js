import Order from "../models/Order.js";

// Used to fetch all the orders 
export const getAllOrders = async (params = {}) => {
    const promise = await Order.find(params).exec();
    return promise;
};

// Used to fetch a particular Order 
export const getOrderById = (id) => {
    const promise = Order.findById(id).exec();
    return promise;
}

export const getAllReviewsOfHelper = async (allOrdersOfHelper) => {
    let reviewsArray = [];
    allOrdersOfHelper.map(async (order) => {
        reviewsArray.push({
            review: order.review,
            seekerId: order.seekerId
        });
    });
    return reviewsArray;
}

export const getAverageRatingOfHelper = async (allOrdersOfHelper) => {
    let averageRating = 0;
    allOrdersOfHelper.map((order) => {
        averageRating = averageRating + order.rating;
    });
    return averageRating;
}

export const getAllReviewInfoOfHelper = async (helperId) => {
    const allOrdersOfHelper = await Order.find({helperId: helperId}).exec();
    let reviewsArray = [];
    let averageRating = 0;
    reviewsArray = await getAllReviewsOfHelper(allOrdersOfHelper);
    averageRating = await getAverageRatingOfHelper(allOrdersOfHelper);
    averageRating = Math.round(averageRating/reviewsArray.length);
    return {
        helperId: helperId,
        reviews: reviewsArray,
        averageRating: averageRating
    }
}