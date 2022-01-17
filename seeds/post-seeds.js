const { Post } = require('../models');

const postInfo = [
    {
        title: 'Bootstrap vs. Regular CSS',
        post_content: 'It was so nice to learn Bootstrap after all the little details of manual css.',
        user_id: 1
    },
    {
        title: 'FullStack and Working with a Team',
        post_content: 'Working with a team is an essential part of fullstack development in most organizations.',
        user_id: 2
    },
    {
        title: 'MVC and Why We Need It',
        post_content: 'MVC stands for Model, View, Controller. It allows us to keep our code separate when developing an application.',
        user_id: 3
    }
]

const postSeeds = () => Post.bulkCreate(postInfo);

module.exports = postSeeds;