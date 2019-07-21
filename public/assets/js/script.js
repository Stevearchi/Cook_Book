// GLOBAL VARS
var errorDiv = $("#err-message");
var errorH3 = "<br><h3 class='text-center text-light'>";

// Click event for View All Recipes
// document.getElementById("#view-all").addEventListener("click", )
var res;

$(document).ready(function() {
  $("#view-all").on("click", function() {
    // alert("View Recipes has been clicked!");
    $.when(
      $.get('/recipes/viewall', function(data) {
        res = data;
      }),
      $.get('/recipes/viewall/render')
      ).then(function() {
        showResults(res);
    })
  });
});

// document.onmouseup = function() {
//   alert("onmouseup!!!!!!!!!!!!!!")
//   $.get('/recipes/viewall/render').then(function() {
//     showResults(res);
//   });
// };


// function onmouseup () {
//   document.getElementById
// }



//Click event for selected recipe from search results
$(document).ready(function() {
    $("#selected-recipe").on("click", function() {
        alert("Go to Full Recipe Button has been clicked!!!!!!!!!!!!!!!!");

    });
});

// Search Results Dynamic Click Events
$("#search-button").on("click", function (event) {
    event.preventDefault();
    errorDiv.empty();
    console.log("Button Works!!!")
    var search = $("#searchQuery").val().trim();
    if (search !== "") {
        $("#contentPanel").empty();
        $("#pheader").empty();
        $("#tableBody").empty();

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
        console.log(data)
        let results = data.recipe;
        console.log(results)
        // Create div to hold all search results
        var newHeader = $("<tr>").append(
            $("<th>").text("Recipe Name:").css("font-weight", "Bold"),
            $("<th>").text("Author:").css("font-weight", "Bold"),
            $("<th>").text("Ingredients:").css("font-weight", "Bold"),
            $("<th>").text("Directions:").css("font-weight", "Bold"),
            $("<th>").text("Image:").css("font-weight", "Bold"),
        )
        if (results.length > 0) {
            
            addCols(results);
        } else {
            return errorDiv.append(errorH3 + "Sorry, no matching recipes were found.</h3>");
        }
    });
};

var addCols = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        var recipeId = arr[i].id;
        var recipeName = arr[i].recipe_name;
        var authorName = arr[i].author_name;
        var ingredients = arr[i].ingredients;
        var directions = arr[i].directions;
        var image = arr[i].image;

        var myCol = $('<div class="col-sm-6 col-md-4 pb-2"></div>');
        var myPanel = $('<div class="card recipe-card" id="' + i + 'Panel" style="width: 18rem;"><img class="card-img-top" src="'+ image + '" alt="Card image cap"> <div class="card-body text-center"> <h5 class="card-title">' + recipeName + '</h5> <p class="card-text">Author: ' + authorName + '</p> <a href="/recipes/indRecipe/'+ recipeId +'" id="selected-recipe" class="btn btn-primary">Go to full recipe</a></div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo('#contentPanel');
    }

    $('.close').on('click', function (e) {
        e.stopPropagation();
        var $target = $(this).parents('.col-sm-3');
        $target.hide('slow', function () { $target.remove(); });
    });
};

// Click event for creating new recipe
$("#create").on("click", function(event) {
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
        .then(function(data) {

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



// To delete a recipe ------------------------------------------------- (Anna)
function deleteRecipe(id) {
    $.ajax({
      method: "DELETE",
      url: "/recipes/indRecipe/" + id
    })
      .then(function() {
        getRecipes(postCategorySelect.val());
      });
  }

