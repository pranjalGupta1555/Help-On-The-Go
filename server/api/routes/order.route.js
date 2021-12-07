import express from 'express';
import * as orderController from '../controllers/OrderController.js';

const router = express.Router();

router.route('/orders')
    .get(orderController.getAllOrders) // gets called when request method is GET with no request params

router.route('/orders/:id')
    .get(orderController.getOrderById) // gets called when request method is GET with a request param of
    .put(orderController.updateOrderById)
    
router.route('/serviceProvidedHistory/:helperId')
    .get(orderController.getSeekerInfoByHelperId) // gets called when request method is GET with a request param of

router.route('/seekerOrders/:id')
    .get(orderController.getAllHelpersForSeeker)

export default router;