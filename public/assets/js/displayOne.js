
//connect with controller and grab the data for one recipe
var id = 1;

$.get("/recipes/indRecipe/"  + id, function(data) {
    console.log("Recipe object: ", data);
    var recipeImage = $('<img src=' + data.image + ' alt="Image of Recipe"')
    $('#recipe-image').append(recipeImage);
    $('#recipe-name').append(data.recipe_name);
    $('#author-name').append(data.author_name);
    $('#recipe-ingred').append(data.ingredients);
    $('#recipe-direct').append(data.directions);
});