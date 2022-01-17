const { Comment } = require('../models');

const commentInfo = [
    {
        comment_text: 'This is so informative!',
        user_id: 4,
        post_id: 2,
    },
    {
        comment_text: 'This is the best post I have ever read in my life!',
        user_id: 5,
        post_id: 3,
    },
    {
        comment_text: 'This is such a crucial part of web development, and this post really hits it on the head.',
        user_id: 1,
        post_id: 2,
    },
    {
        comment_text: 'This post was not helpful at all.',
        user_id: 2,
        post_id: 1,
    },
    {
        comment_text: 'I really appreciated this info because I am always trying to learn more about this area!',
        user_id: 6,
        post_id: 3,
    }
];

const commentSeeds = () => Comment.bulkCreate(commentInfo);

module.exports = commentSeeds;