import express from 'express';
import * as domainController from '../controllers/DomainController.js';

const router = express.Router();

router.route('/domains')
    .get(domainController.index) // gets called when request method is GET with no request params

router.route('/domains/:id')
    .get(domainController.getDomainById) // gets called when request method is GET with a request param of domain id

router.route('/domainNames')
    .get(domainController.getAllDomains);

router.route('/domain/:name')
    .get(domainController.getSkillsForDomain);

router.route('/domain/:domainName/:skillName')
    .get(domainController.findUsersBySkills);

export default router;