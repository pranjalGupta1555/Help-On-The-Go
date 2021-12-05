import express from "express";
import authenticate from '../auth/auth.js';
import * as UserController from "../controllers/UserController.js";
import * as OrderController from "../controllers/OrderController.js";
import multer from 'multer';

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter(req, file, cb) {

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(undefined, true)

        } else {
            cb(new Error('Please upload an image.'))
        }

    }
})



const Router = express.Router();

Router.route('/upload/:id')
    .get(UserController.fetchProfileImage)
    .put(upload.single('upload'), UserController.uploadUserImage);

Router.route('/users')
    .get(authenticate, UserController.allUsers)
    .post(UserController.addUser);

Router.route('/helperreviews/:id')
    .get(OrderController.getAllReviewInfoByHelperId);

Router.route('/login')
    .post(UserController.loginUser);

Router.route('/users/:id')
    .get(UserController.getUserInfo)
    .put(UserController.updateUserByID);

Router.route('/join/:id')
    .put(UserController.updateUserByID);

Router.route('/validate/:username')
    .get(UserController.checkUserName);

Router.route('/seek')
    .post(UserController.getSeekers);



export default Router;
