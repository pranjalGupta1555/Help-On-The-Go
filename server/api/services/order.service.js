import Order from "../models/Order.js";

// Used to fetch all the orders 
export const getAllOrders = (params = {}) => {
    const promise = Order.find(params).exec();
    return promise;
};

// Used to fetch a particular Order 
export const getOrderById = (id) => {
    const promise = Order.findById(id).exec();
    return promise;
}