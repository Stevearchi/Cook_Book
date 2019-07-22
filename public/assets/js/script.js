// GLOBAL VARS
var errorDiv = $("#err-message");
var errorH3 = "<br><h3 class='text-center text-light'>";


// VIEW ALL RECIPES EVENT
// $(document).ready(function () {

//     $("#view-all").on("click", function () {
//         alert("I've been clicked!");
//         // $.get('/recipes/viewall/render').then(function (data) {
//         //     // res.render(addCols(data));
//         // })
//     });

// });


// Search Results Dynamic Click Events
$("#search-button").on("click", function (event) {
    event.preventDefault();
    $("#feature-carousel").hide();
    errorDiv.empty();

    var search = $("#searchQuery").val().trim();
    if (search !== "") {
        $("#contentPanel").empty();

        showResults(search);
        $("#searchQuery").val("");
    } else {
        $("#contentPanel").empty();
        $("#pheader").empty();
        $("#tableBody").empty();
        errorDiv.append(errorH3 + "Please type a recipe.</h3>");
    }
});

function showResults(search) {
    $.get('/recipes/searchedRecipes/' + search + '').then(function (data) {
        $("tableBody").empty();
        let results = data.recipe;
        if (results.length > 0) {

            addCols(results, "#contentPanel");
        } else {
            return errorDiv.append(errorH3 + "Sorry, no matching recipes were found.</h3>");
        }
    });
};

var addCols = function (arr, element) {
    for (var i = 0; i < arr.length; i++) {
        var recipeId = arr[i].id;
        var recipeName = arr[i].recipe_name;
        var authorName = arr[i].author_name;
        var ingredients = arr[i].ingredients;
        var directions = arr[i].directions;
        var image = arr[i].image;

        var myCol = $('<div class="col-sm-6 col-md-4 pb-2"></div>');
        var myPanel = $('<div class="card recipe-card" id="' + i + 'Panel" style="width: 18rem;"><img class="card-img-top" src="' + image + '" alt="Card image cap"> <div class="card-body text-center"> <h5 class="card-title">' + recipeName + '</h5> <p class="card-text">Author: ' + authorName + '</p> <a href="/recipes/indrecipe/' + recipeId + '" id="' + i + '" class="test btn btn-primary">Go to full recipe</a></div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo(element);
    }

    $('.close').on('click', function (e) {
        e.stopPropagation();
        var $target = $(this).parents('.col-sm-3');
        $target.hide('slow', function () { $target.remove(); });
    });
};

// Adding a new recipe in the Create page

// Click event
$("#create").on("click", function (event) {
    event.preventDefault();
    // Making new recipe object

    var newRecipe = {
        recipe_name: $("#recipeName").val().trim(),
        author_name: 'TESTING',
        ingredients: $("#ingredients").val().trim(),
        directions: $("#directions").val().trim(),
        image: $("#recipeImage").val().trim()
    };
    // AJAX POST - request with jQuery
    $.post("/recipes/create", newRecipe)
        .then(function (data) {

            alert("Adding new recipe " + data.recipe_name);
        });

    // Empty input fields after submitting
    $("#recipeName").val("");
    // $("#author-name").val("");
    $("#ingredients").val("");
    // $("#measurements").val("");
    $("#directions").val("");
    $("#recipeImage").val("");
});


// ============================== VIEW ALL RECIPES CODE ===============================
$(document).ready(function () {

    showResults2();

});  

function showResults2() {
    $.get('/recipes/viewAll/data').then(function (data) {
        $("tableBody").empty();

        let results = data.recipe;
        // Create div to hold all search results
        if (results.length > 0) {

            addCols(results, "#viewAll");
        } else {
            return errorDiv.append(errorH3 + "Sorry, no matching recipes were found.</h3>");
        }


    });
}

// $(this).on("click", function(){
// });

// To delete a recipe ------------------------------------------------- (Anna)
function deleteRecipe(id) {
    
    $.ajax({
        method: "DELETE",
        url: "/recipes/indRecipe/" + id
    })
        .then(function () {
            getRecipes(postCategorySelect.val());
        });
}

// To update a recipe and bring user to the viewAll page when done ---------------- (Anna)
function updateRecipe(recipe) {
    $.ajax({
      method: "PUT",
      url: "/recipes/viewall",   
      data: recipe
    })
      .then(function() {
        window.location.href = "/recipes/viewall";
      });
  }
//
