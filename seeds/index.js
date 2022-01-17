const sequelize = require('../config/connection');
const userSeeds = require('./user-seeds');
const postSeeds = require('./post-seeds');
const commentSeeds = require('./comment-seeds');

const allSeeds = async () => {
    await sequelize.sync({ force: true });
    console.log('awaiting');
    await userSeeds();
    console.log('seeding users');

    await postSeeds();
    console.log('seeding posts');

    await commentSeeds();
    console.log('seeding comments');

    process.exit(0);
};

allSeeds();