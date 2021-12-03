import express from 'express';
import * as locationController from '../controllers/LocationController.js';

const router = express.Router();

router.route('/locations')
    .get(locationController.allLocations); // gets called when request method is GET with no request params


export default router;