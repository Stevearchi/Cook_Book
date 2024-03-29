var express = require("express");
var passport = require("passport");
const Sequelize = require('sequelize');

var router = express.Router();

// ** Import the model (recipe.js) to use it's database functions.
var db = require("../models");

// ** Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    res.render("index");
});

router.get('/recipes/indRecipe/', function(req, res){

    res.render('oneRecipe')
})

//Grab one recipe for indRecipe page
router.get('/recipes/indRecipe/:id', function(req, res){
    res.render('oneRecipe');
});

//Grab one recipe for indRecipe page
router.get('/recipes/indRecipe/data/:id', function(req, res){
    db.Recipe.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (data) {

        res.json(data);
    });
});


router.get('/recipes/searchedRecipes/:searchQuery', function (req, res) {

    db.Recipe.findAll({
        where: {
            recipe_name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('recipe_name')), 'LIKE', '%' + req.params.searchQuery + '%')
        }
    })
        .then(function (recipes) {
            var searchedRecipes = {
                recipe: recipes
            }
            res.json(searchedRecipes);
        })
});

router.get('/recipes/create', isLoggedIn, function (req, res) {
    //    res.send("create 'createRecipe.ejs file to render");
    res.render("create");
});

router.post("/recipes/create", function (req, res) {
    db.Recipe.create(req.body).then(function (data) {
        res.json(data);
    })
});

router.get("/recipes/viewall", function(req, res){
    res.render("viewAll");
});

router.get('/recipes/viewAll/data', function (req, res) {

    db.Recipe.findAll({})
        .then(function (recipes) {
            var searchedRecipes = {
                recipe: recipes
            }
            res.json(searchedRecipes);
        })
});

// ** To delete a recipe
router.delete("/recipes/delete/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    recipe.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            // */ If no rows were changed then the ID must not exist
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// ===================== AUTHENTICATION ROUTES ============================
router.get('/users/register', function (req, res) {
    res.render('register');
});

router.get('/users/login', function (req, res) {
    res.render('login');
});

router.post('/users/register', passport.authenticate('local-signup',
    {
        successRedirect: '/users/dashboard',
        failureRedirect: '/users/register'
    }
));

router.get('/users/dashboard', isLoggedIn, function (req, res) {
    res.render('dashboard');
});

router.get('/users/logout', function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

router.post('/users/login', passport.authenticate('local-signin',
    {
        successRedirect: '/recipes/create',
        failureRedirect: '/users/login'
    }
));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/users/login');
}

// Export routes for server.js to use
module.exports = router;