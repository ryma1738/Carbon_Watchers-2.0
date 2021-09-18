const router = require('express').Router();
const carbonRoutes = require('./carbonRoutes.js');
const articleRoutes = require('./articleRoutes.js');

router.use('/carbon', carbonRoutes);
router.use('/article', articleRoutes);

module.exports = router;