const express = require('express');
const router = new express.Router();
const testController  = require('../controllers/testController');
/* GET home page. */
router.route('/users')
    .get(testController.indexUser);

router.route('/users/forums')
    .get(testController.userForums);

router.route('/users/forum/:id')
    .get(testController.forumChat);

module.exports = router;
