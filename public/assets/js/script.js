// Search Results Dynamic Click Events
$("#search-button").on("click", function (event) {
    event.preventDefault();
    console.log("Button Works!!!")

    var search = $("#searchQuery").val().trim();
    showResults(search);
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
        }

    });
};

