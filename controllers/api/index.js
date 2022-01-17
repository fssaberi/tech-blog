const router = require('express').Router();
const routesUser = require('./user-routes');
const routesPost = require('./post-routes');
const routesComment = require('./comment-routes');

router.use('/users', routesUser);
router.use('/posts', routesPost);
router.use('/comments', routesComment);

module.exports = router;