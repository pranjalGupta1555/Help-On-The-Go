import { request, response } from 'express';
import * as domainService from '../services/domain.service.js';

// this function gets called whenever error is occured and sets the response code to 500
const errorhandler = (message, response) => {
    response.status(500);
    response.json({ error:message });
}

// this function sets the response from the data passed to it
const setSuccessResponse = (data, response) => {
    response.status(200);
    response.json(data);
}

// this function gets called from the router when request is made with GET method and no params are passed
export const index = async (request, response) => {

    try {
        const domains = await domainService.getAllDomains();
        setSuccessResponse(domains, response);
    }
    catch(e) {
        errorhandler(e.message, response);
    }

};

// this function gets called from the router when request is made with GET method and domain id is passed as request param
export const getDomainById = async (request, response) => {
    try {
        const id = request.params.id;
        const domain = await domainService.getDomainById(id);
        setSuccessResponse(domain, response);
    }
    catch(e) {
        errorhandler(e.message, response);
    }
};