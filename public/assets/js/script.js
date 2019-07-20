// GLOBAL VARS
var errorDiv = $("#err-message");
var errorH3 = "<br><h3 class='text-center text-light'>";

// Search Results Dynamic Click Events
$("#search-button").on("click", function (event) {
    event.preventDefault();
    errorDiv.empty();
    console.log("Button Works!!!")
    var search = $("#searchQuery").val().trim();
    if(search !== ""){
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
        }else{
            return errorDiv.append(errorH3 + "Sorry, no matching recipes were found.</h3>");
        }


    });
}

var addCols = function (num){
    for (var i=1;i<=num;i++) {
        var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
        var myPanel = $('<div class="card card-outline-info" id="'+i+'Panel"><div class="card-block"><div class="card-title"><span>Card #'+i+'</span><button type="button" class="close" data-target="#'+i+'Panel" data-dismiss="alert"><span class="float-right"><i class="fa fa-remove"></i></span></button></div><p>Some text in '+i+' </p><img src="//placehold.it/50/eeeeee" class="rounded rounded-circle"></div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo('#contentPanel');
    }
    
    
    $('.close').on('click', function(e){
      e.stopPropagation();  
          var $target = $(this).parents('.col-sm-3');
          $target.hide('slow', function(){ $target.remove(); });
    });
};

$('#btnGen').click(function(){
    addCols($('#numPanels').val());
    return false;
});

