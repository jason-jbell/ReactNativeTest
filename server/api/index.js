const router = require('express').Router();

// /api

// /api/stores
router.use('/stores', require('./stores'));

router.use('/owners', require('./owners'));

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
