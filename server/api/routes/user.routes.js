import express from "express";
import authenticate from '../auth/auth.js';
import * as UserController from "../controllers/UserController.js";
import * as OrderController from "../controllers/OrderController.js";


const Router = express.Router();

Router.route('/user')
    .get(authenticate, UserController.allUsers)
    .post(UserController.addUser);

Router.route('/helperreviews/:id')
    .get(OrderController.getAllReviewInfoByHelperId);

Router.route('/login')
    .post(UserController.loginUser);

Router.route('/user/:id')
    .get(UserController.getUserInfo);

    
Router.route('/join/id')
.put(UserController.updateUserByID);

Router.route('/validate/:username')
    .get(UserController.checkUserName);

Router.route('/seek')
    .post(UserController.getSeekers)



export default Router;
