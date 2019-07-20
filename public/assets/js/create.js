// Adding a new recipe in the Create page

// Click event
$("#create").on("click", function(event) {
    event.preventDefault();   

    // Making new recipe object
    var newRecipe = {
        recipe_name: $("#recipe-name").val().trim(),
        author_name: $("#author-name").val().trim(),
        ingredients: $("#ingredients").val().trim(),
        measurements: $("#measurements").val().trim(),
        directions: $("#directions").val().trim(),
        image: $("#image").val().trim()
    };

   // AJAX POST - request with jQuery
    $.post("/api/#", newRecipe)
        .then(function(data) {
            console.log(data.recipe_name);
            alert("Adding new recipe " + data.recipe_name);
        });

   // Empty input fields after submitting
    $("#recipe-name").val("");
    $("#author-name").val("");
    $("#ingredients").val("");
    $("#measurements").val("");
    $("#directions").val("");
    $("#image").val("");
});





// Search Results Dynamic Click Events
// $("#search-button").on("click", function(event) {
//     event.preventDefault(); 
//     console.log("Button Works!!!")

//     var search = $("#searchQuery").val().trim();
//     showResults(search);
// });

// function showResults(search) {
//     $.get('/recipes/searchedRecipes/' + search + '').then(function(data){
//         console.log(data)
//         let results = data.recipe;
//         console.log(results)
//                     // Create div to hold all search results
                   
//                     var newHeader = $("<tr>").append(
//                         $("<th>").text("Recipe Name:").css("font-weight", "Bold"),
//                         $("<th>").text("Author:").css("font-weight", "Bold"),
//                         $("<th>").text("Ingredients:").css("font-weight", "Bold"),
//                         $("<th>").text("Directions:").css("font-weight", "Bold"),
//                         $("<th>").text("Image:").css("font-weight", "Bold"),
//                     )
//                     $("#pheader").append(newHeader);

//                     for (var i = 0; i < results.length; i++) {
//                         var recipeName = results[i].recipe_name;
//                         var authorName = results[i].author_name;
//                         var ingredients = results[i].ingredients;
//                         var directions = results[i].directions;
//                         var image = results[i].image;
        
//                         var newRow = $("<tr class='newrow'>").append(
//                             $("<td>").text(recipeName),
//                             $("<td>").text(authorName),
//                             $("<td>").text(ingredients),
//                             $("<td>").text(directions),
//                             $("<td>").html("<img id='recipeImage' class='recipeImg' src=" + image + ">"),
//                         )
//                         newRow.attr("data-name", results[i].id)
//                         $("#tableBody").append(newRow);
//                     }
//     });
// };
