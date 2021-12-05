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
            seekerId: order.seekerId,
            ...(order.rating !== undefined) && {rating: order.rating}
        });
    });
    return reviewsArray;
}

export const getAverageRatingOfHelper = async (allOrdersOfHelper) => {
    let sumOfRatings = 0;
    let count = 0;
    allOrdersOfHelper.map((order) => {
        if(order.rating !== undefined && order.rating != '' && order.rating != null) {
            sumOfRatings = sumOfRatings + order.rating;
            count++;
        }
    });
    if(count > 0) {
        return Math.round(sumOfRatings/count);
    }
    else {
        return null;
    }
}

export const getAllReviewInfoOfHelper = async (helperId) => {
    const allOrdersOfHelper = await Order.find({helperId: helperId}).exec();
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

export const getAllOrdersOfAHelper = async (helperId) => {
    const allOrdersOfHelper = await Order.find({helperId: helperId}).exec();
    return allOrdersOfHelper;
}