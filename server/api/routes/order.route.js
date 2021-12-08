import express from 'express';
import * as orderController from '../controllers/OrderController.js';

const router = express.Router();

// to get all the orders placed till now
router.route('/orders')
    .get(orderController.getAllOrders) // gets called when request method is GET with no request params

// for specific order  
router.route('/orders/:id')
    .get(orderController.getOrderById) // gets called when request method is GET with a request param of orderId
    .put(orderController.updateOrderById) // called when request method is PUT with a request param of orderId
    
// to get the history of all the services provided by a helper
router.route('/serviceProvidedHistory/:helperId')
    .get(orderController.getSeekerInfoByHelperId) // gets called when request method is GET with a request param of

router.route('/seekerOrders/:id')
    .get(orderController.getAllHelpersForSeeker)

router.route('/newOrder')
    .post(orderController.addNewOrder)

export default router;