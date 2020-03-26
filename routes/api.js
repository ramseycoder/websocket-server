const express = require('express');
const router =  express.Router();
const apiController  = require('../controllers/apiContoller');
/* GET home page. */
router.post('/setChat',apiController.setNewChat);
router.post('/setForum',apiController.setNewForum);
router.post('/getChatMessages',apiController.getChatMessages);
router.post('/getForumMessages',apiController.getForumMessages);

module.exports = router;
