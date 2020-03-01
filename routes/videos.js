const express = require('express');
const router = express.Router();

const { videosController } = require('../controller');

router.get('/:id', videosController.get); // 유튜브 가져오기

module.exports = router;
