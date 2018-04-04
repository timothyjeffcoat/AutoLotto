const router = require('express-promise-router')();

// Controller Functions
const { root, fail, notFound, scoop } = require('../controllers/index');

// Routes
router.get('/', root);
router.get('/scoop', scoop);
router.get('/fail', fail);

// Fall Through Route
router.use(notFound);

module.exports = router;