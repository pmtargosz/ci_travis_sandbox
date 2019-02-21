const path = require('path');
const router = require('express').Router();

router.get('*', (req, res, next) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'))
});

module.exports = router