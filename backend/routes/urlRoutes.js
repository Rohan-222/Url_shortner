const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten', urlController.createShortUrl);
router.get('/:shortUrl', urlController.redirectUrl);
router.get('/analytics/all', urlController.getAnalytics);
router.delete('/analytics/:id', urlController.deleteUrl);

module.exports = router;
