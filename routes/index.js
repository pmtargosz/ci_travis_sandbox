const router = require('express').Router();

router.post('*', require('../middlewares/cleanCache'));
router.use('/auth', require('./authRoutes'));
router.use('/api', require('./blogRoutes'));
router.use(require('./homeRoutes'));

module.exports = router;