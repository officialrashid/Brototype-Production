import express, { Router, Request, Response } from "express";
import { chatAndVideo_Controller } from "../../libs/controllers";
import multer, { memoryStorage } from 'multer';
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';
const storage = memoryStorage();
const upload = multer({ storage });

export default (dependencies: any): Router => {
    const router = express.Router();
    const { createChatController, sendMessageController, getAllChatRecipientsController, getMessagesController, storeChatAudioController,storeChatImageController,createGroupChatController,getGroupMessagesController,getGroupMembersController,updateParticipantStatusController,updateGroupMembersController,deleteMessageController,getUnreadMsgCountController,updateUnreadMsgZeroController,updateGroupUnreadMsgZeroController } = chatAndVideo_Controller(dependencies);

    router.post('/create-chat', jwtVerification(secretKey),createChatController);
    router.post('/send-message',jwtVerification(secretKey), sendMessageController);
    router.get('/get-all-chat-recipients/:initiatorId',jwtVerification(secretKey), getAllChatRecipientsController);
    router.get('/get-messages',jwtVerification(secretKey),getMessagesController);
    router.post('/store-chat-audio',jwtVerification(secretKey),upload.single('audio'),storeChatAudioController);
    router.post('/store-chat-image',jwtVerification(secretKey),upload.single('image'),storeChatImageController);
    router.post('/store-chat-video',jwtVerification(secretKey),upload.single('video'),storeChatImageController);
    router.post('/store-chat-document',jwtVerification(secretKey),upload.single('document'),storeChatImageController);
    router.post('/create-group-chat',jwtVerification(secretKey),upload.single('groupChatProfile'),createGroupChatController);
    router.get('/get-group-messages',jwtVerification(secretKey),getGroupMessagesController);
    router.get('/get-group-members-details/:groupId',jwtVerification(secretKey),getGroupMembersController);
    router.patch('/update-group-participant-status',jwtVerification(secretKey),updateParticipantStatusController);
    router.patch('/update-group-members',jwtVerification(secretKey),updateGroupMembersController);
    router.delete('/delete-message',jwtVerification(secretKey),deleteMessageController);
    router.delete('/get-unread-message-count',jwtVerification(secretKey),deleteMessageController);
    router.get('/get-unread-message-count/:initiatorId',jwtVerification(secretKey),getUnreadMsgCountController);
    router.patch('/update-unread-msg-zero',jwtVerification(secretKey),updateUnreadMsgZeroController);
    router.patch('/update-group-unread-msg-zero',jwtVerification(secretKey),updateGroupUnreadMsgZeroController);
    return router;
};
