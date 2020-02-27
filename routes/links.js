const express = require('express');
const router = express.Router();

const { linksController } = require('../controller');

router.get('/:id', linksController.get); // 유튜브 가져오기

module.exports = router;
