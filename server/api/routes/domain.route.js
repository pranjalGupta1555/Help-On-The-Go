import express from 'express';
import * as domainController from '../controllers/DomainController.js';

const router = express.Router();

router.route('/domains')
    .get(domainController.index) // gets called when request method is GET with no request params

router.route('/domains/:id')
    .get(domainController.getDomainById) // gets called when request method is GET with a request param of domain id

router.route('/domain/:domainName/:skillName')
    .get(domainController.findUsersBySkills);

router.route('/skills/:domain')
    .get(domainController.getDomainSkills)


export default router;