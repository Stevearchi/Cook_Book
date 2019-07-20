// GLOBAL VARS
var errorDiv = $("#err-message");
var errorH3 = "<br><h3 class='text-center text-light'>";

// Search Results Dynamic Click Events
$("#search-button").on("click", function (event) {
    event.preventDefault();
    errorDiv.empty();
    console.log("Button Works!!!")
    var search = $("#searchQuery").val().trim();
    if (search !== "") {
        $("#pheader").empty();
        $("#tableBody").empty();

        showResults(search);
        $("#searchQuery").val("");
    } else {
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
            $("#pheader").append(newHeader);

            addCols(results);
            for (var i = 0; i < results.length; i++) {
                var recipeName = results[i].recipe_name;
                var authorName = results[i].author_name;
                var ingredients = results[i].ingredients;
                var directions = results[i].directions;
                var image = results[i].image;

                var newRow = $("<tr class='newrow'>").append(
                    $("<td>").text(recipeName),
                    $("<td>").text(authorName),
                    $("<td>").text(ingredients),
                    $("<td>").text(directions),
                    $("<td>").html("<img id='recipeImage' class='recipeImg' src=" + image + ">"),
                )
                newRow.attr("data-name", results[i].id)

                $("#tableBody").append(newRow);

            }
        } else {
            return errorDiv.append(errorH3 + "Sorry, no matching recipes were found.</h3>");
        }


    });
}

var addCols = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        var recipeId = arr[i].id;
        var recipeName = arr[i].recipe_name;
        var authorName = arr[i].author_name;
        var ingredients = arr[i].ingredients;
        var directions = arr[i].directions;
        var image = arr[i].image;

        var myCol = $('<div class="col-sm-6 col-md-4 pb-2"></div>');
        // var myPanel = $('<div class="card card-outline-info" id="' + i + 'Panel"><div class="card-block"><div class="card-title"><span class="movecenter">' + recipeName + '</span><button type="button" class="close" data-target="#' + i + 'Panel" data-dismiss="alert"><span class="float-right"><i class="fa fa-remove"></i></span></button></div><p> ' + authorName + ' </p><img src="' + image +'" class="mx-auto rounded rounded-circle recipeImg"></div></div>');
        var myPanel = $('<div class="card recipe-card" id="' + i + 'Panel" style="width: 18rem;"><img class="card-img-top" src="'+ image + '" alt="Card image cap"> <div class="card-body text-center"> <h5 class="card-title">' + recipeName + '</h5> <p class="card-text">Author: ' + authorName + '</p> <a href="/recipes/indRecipe/'+ recipeId +'" class="btn btn-primary">Go to full recipe</a></div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo('#contentPanel');
    }


    $('.close').on('click', function (e) {
        e.stopPropagation();
        var $target = $(this).parents('.col-sm-3');
        $target.hide('slow', function () { $target.remove(); });
    });
};


