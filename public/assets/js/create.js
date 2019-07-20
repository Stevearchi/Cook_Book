// Adding a new recipe in the Create page
​
// Click event
$("#create").on("click", function(event) {
    event.preventDefault();   
​
    // Making new recipe object
    var newRecipe = {
        recipe_name: $("#recipe-name").val().trim(),
        author_name: $("#author-name").val().trim(),
        ingredients: $("#ingredients").val().trim(),
        measurements: $("#measurements").val().trim(),
        directions: $("#directions").val().trim(),
        image: $("#image").val().trim()
    };
​
   // AJAX POST - request with jQuery
    $.post("/api/#", newRecipe)
        .then(function(data) {
            console.log(data.recipe_name);
            alert("Adding new recipe " + data.recipe_name);
        });
​
   // Empty input fields after submitting
    $("#recipe-name").val("");
    $("#author-name").val("");
    $("#ingredients").val("");
    $("#measurements").val("");
    $("#directions").val("");
    $("#image").val("");
});