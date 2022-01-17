const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostInfo => res.json(dbPostInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostInfo => {
            if (!dbPostInfo) {
                res.status(404).json({ message: 'Sorry, there is no post with this specific id.' });
                return;
            }
            res.json(dbPostInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create new post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.body.user_id
    })
        .then(dbPostInfo => res.json(dbPostInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// update specific post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostInfo => {
            if (!dbPostInfo) {
                res.status(404).json({ message: 'Sorry, there is no post with this specific id.' });
                return;
            }
            res.json(dbPostInfo);
        })
        .catch(err => {
            console.loge(err);
            res.status(500).json(err);
        });
});

// delete specific post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostInfo => {
            if (!dbPostInfo) {
                res.status(404).json({ message: 'Sorry, there is no post in our system with this id.' });
                return;
            }
            res.json(dbPostInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
