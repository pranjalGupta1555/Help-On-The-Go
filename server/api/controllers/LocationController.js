import * as locationService from './../services/location.service.js'

const errorHandler = (message, res) => {
    res.status(400).json({ error: message });
}

// this function sets the response from the data passed to it
const successHandler = (message, data, res) => {
    res.status(200).json({ message: message, data: data });
}

//used to fetch all the locations
export const allLocations = async(request, response) => {
    try {
        const result = await locationService.getAllLocations();
        successHandler("success", result, response);
    } catch (e) {
        errorHandler(err.message, response);
    }

};