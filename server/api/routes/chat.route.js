import express from 'express';
import * as chatController from '../controllers/ChatController.js';

const router = express.Router();

router.route('/chat/:username1/:username2')
    .get(chatController.getChatId)

router.route('/newChat')
    .post(chatController.putNewChat)

export default router;