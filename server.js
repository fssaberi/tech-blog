const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const aSession = {
    secret: 'something secret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(aSession));
app.use(routes);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// connect to database and to server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Listening now!'));
});