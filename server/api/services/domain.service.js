import Domain from "../models/Domain.js";
import User from '../models/User.js';

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

export const getAllDomainNames = async(params = {}) => {
    const promise = await User.find().exec();
    let dom = []
    dom.push('Select a Domain')
    for (let i = 0; i < promise.length; i++) {
        for (let j = 0; j < promise[i].skillset.length; j++) {
            dom.push(promise[i].skillset[j].domain);
        }
    }
    return [...new Set(dom)];
};

export const getSkills = async(domain) => {
    const promise = await User.find().exec();
    let skills = []
    skills.push('Select a Skill')
    for (let i = 0; i < promise.length; i++) {
        for (let j = 0; j < promise[i].skillset.length; j++) {
            if (promise[i].skillset[j].domain == domain) {
                skills.push(promise[i].skillset[j].skill);
            }
        }
    }
    return [...new Set(skills)];
};

export const findUsersBySkills = async(domainName, skillName) => {
    const promise = await User.find().exec();
    let users = []
    for (let i = 0; i < promise.length; i++) {
        for (let j = 0; j < promise[i].skillset.length; j++) {
            if (promise[i].skillset[j].domain == domainName && promise[i].skillset[j].skill == skillName) {
                users.push(promise[i]);
            }
        }
    }
    return users;
};