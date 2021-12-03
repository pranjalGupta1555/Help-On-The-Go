import Location from "../models/Location.js";

export const getAllLocations = (params = {}) => {
    const promise = Location.find(params).exec();
    return promise;
};