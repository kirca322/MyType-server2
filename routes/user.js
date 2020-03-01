const express = require('express');
const router = express.Router({ strict: true });

const { userController } = require('../controller');

router.get('/info', userController.infoController);

router.post('/signin', userController.signInController);

router.post('/signup', userController.signUpController);

module.exports = router;
