const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserInfo => res.json(dbUserInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exlude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbUserInfo => {
            if (!dbUserInfo) {
                res.status(404).json({ message: 'Sorry, there is no user in our database with this same id' });
                return;
            }
            res.json(dbUserInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create new user
router.post('/', withAuth, (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserInfo => {
            req.session.save(() => {
                req.session.user_id = dbUserInfo.id;
                req.session.username = dbUserInfo.username;
                req.session.loggedIn = true;
                res.json(dbUserInfo);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// log in current user
router.post('/login', withAuth, (req, res) => {
    User.findOne({
        where: {
            email: req.body.emamil
        }
    })
        .then(dbUserInfo => {
            if(!dbUserInfo) {
                res.status(400).json({ message: 'Sorry, there is no user in our database with this email.' });
                return;
            }

            const passwordTrue = dbUserInfo.checkPassword(req.body.password);
            if(!passwordTrue) {
                res.status(400).json({ message: 'Sorry, this is the wrong password. '});
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserInfo.id,
                req.session.username = dbUserInfo.username;
                req.session.loggedIn = true;
                res.json({ user: dbUserInfo, message: 'You have successfully logged into the site.' });
            });
        });
});

// log out current user
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// update specific user by id
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserInfo => {
            if (!dbUserInfo[0]) {
                res.status(404).json({ message: 'Sorry, there is no user in our system with this id.' });
                return;
            }
            res.json(dbUserInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a specific user by id
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserInfo => {
            if (!dbUserInfo) {
                res.status(404).json({ message: 'Sorry, there is no user in our system with this id.' });
                return;
            }
            res.json(dbUserInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
