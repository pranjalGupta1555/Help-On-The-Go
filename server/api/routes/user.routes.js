import express from "express";
import authenticate from '../auth/auth.js';
import * as UserController from "../controllers/UserController.js";


const Router = express.Router();

Router.route('/user')
    .get(authenticate, UserController.allUsers)
    .post(UserController.addUser);

Router.route('/login')
    .post(UserController.loginUser);

Router.route('/user/:id')
    .get(UserController.getUserInfo);

Router.route('/validate/:username')
    .get(UserController.checkUserName);

Router.route('/seek')
    .post(UserController.getSeekers)



export default Router;
