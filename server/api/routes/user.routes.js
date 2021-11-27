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


export default Router;