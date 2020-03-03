const express = require('express');
const router = express.Router({ strict: true });

const { userController } = require('../controller');

// router.get('/info', userController.infoController);

router.post('/category', userController.categoryController);

router.get('/categoryList', userController.categoryListController);

router.post('/signin', userController.signInController);

router.post('/signup', userController.signUpController);

router.post('/addCategory', userController.addCategoryController);

router.post('/addVideo', userController.addVideoController);

router.post('/deleteVideo', userController.deleteVideoController);

router.post('/deleteCategory', userController.deleteCategoryController);

module.exports = router;
