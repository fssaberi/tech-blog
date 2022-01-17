const { User, Post } = require('../models');
const sequelize = require('../config/connection');

const userInfo = [
    {
        username: 'munchkincrunch2',
        email: 'munchycrunchy@somewhere.com',
        password: 'thisismypass'
    },
    {
        username: 'curlysquirrely44',
        email: 'iamcurlysquirrely@somewhere.com',
        password: 'somuchfun'
    },
    {
        username: 'heyitsme',
        email: 'onlymefornow@somewhere.com',
        password: 'sothisislife'
    },
    {
        username: 'forManana',
        email: 'tomorrow@somewhere.com',
        password: 'tmrwitis'
    },
    {
        username: 'turkeyleg',
        email: 'thanksgiving@somewhere.com',
        password: 'cranberry442'
    },
    {
        username: 'EasterBunny',
        email: 'chocolateeggs@somewhere.com',
        password: 'jackfrost30'
    }
];

const userSeeds = () => User.bulkCreate(userInfo, {individualHooks: true});

module.exports = userSeeds; 