import Domain from "../models/Domain.js";

/** this function gets called from controller when request is made with GET method without any request params.
 * Entire data (domain list) is sent in the response as no params are passed.
 */
export const getAllDomains = (params = {}) => {
    const promise = Domain.find(params).exec();
    return promise;
};

/** this function gets called from controller when request is made with GET method along with a request param.
 * Domain whose id matches with the one passed in request param is sent as the response.
 */
 export const getDomainById = (id) => {
    const promise = Domain.findById(id).exec();
    return promise;
}