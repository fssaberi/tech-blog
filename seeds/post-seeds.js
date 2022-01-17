const { Post } = require('../models');

const postInfo = [
    {
        title: 'Bootstrap vs. Regular CSS',
        post_content: 'It was so nice to learn Bootstrap after all the little details of manual css. I wish they would have taught us Bootstrap first but it is also really helpful to know how to style from scratch! Watch this space for more on the benefits of both Bootstrap and creating your own stylesheet!',
        user_id: 1
    },
    {
        title: 'FullStack and Working with a Team',
        post_content: 'Working with a team is an essential part of fullstack development in most organizations. While many web developers would love to work on their own in the world of code, it is incredibly important to be able to work together with others to reach a common goal. Communication is key here, and watch this space for more on that.',
        user_id: 2
    },
    {
        title: 'MVC and Why We Need It',
        post_content: 'MVC stands for Model, View, Controller. It allows us to keep our code separate when developing an application. We will be including more information here soon.',
        user_id: 3
    }
]

const postSeeds = () => Post.bulkCreate(postInfo);

module.exports = postSeeds;