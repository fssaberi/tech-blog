const router = require('express').Router();
const { Comment } = require('../../models');
const yesAuthorized = require('../../utils/auth');

// get all comments, api/comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(dbCommentInfo => res.json(dbCommentInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create new comment
router.post('/', yesAuthorized, (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
        .then(dbCommentInfo => res.json(dbCommentInfo))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    
});

// delete comment
router.delete('/:id', yesAuthorized, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentInfo => {
            if (!dbCommentInfo) {
                res.status(404).json({ message: 'Sorry, there is no comment in our system with this specific id.' });
                return;
            }
            res.json(dbCommentInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;