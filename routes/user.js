const express = require('express');
const router = express.Router({ strict: true });

const { userController } = require('../controller');

router.post('/signin', userController.signInController);

router.post('/signout', userController.signOutController);

router.post('/signup', userController.signUpController);

module.exports = router;
