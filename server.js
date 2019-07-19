// ** Dependencies
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// ** USE INDEX.EJS
const db = require('./models');
const app = express();

const PORT = process.env.PORT || 8080;

// ** EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// **/BODYPARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ** FOR PASSPORT USING EXPRESS SESSION
app.use(session({ secret: 'keyboard cat', resave: true,
saveUninitialized: true })); // session secret

// ** PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session()); // for persistent login

// ? Import routes and give the sever access to them     NEEDED????
var routes = require("./controllers/recipeController.js")
app.use(routes);

//load passport strategies
require('./config/passport.js')(passport, db.user);

db.sequelize.sync().then(function () {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(function (err) {
    console.log(err, "Something went wrong updating the Database");
});