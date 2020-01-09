var params = new URLSearchParams(window.location.search.slice(1));
    if(params.has("meal_id") && params.has("drink_id")){
        var meal_id = params.get("meal_id");
        var drink_id = params.get("drink_id");
        console.log(meal_id, drink_id);
    }

var m_route = "meals"
var m_modifier = "meal"
var m_name = "strMeal"
var m_img = "strMealThumb"
var m_search_query_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" +  meal_id

get_results(m_route, m_name, m_img, m_search_query_url, m_modifier);

var d_route = "drinks"
var d_modifier = "drink"
var d_name = "strDrink"
var d_img = "strDrinkThumb"
var d_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +  drink_id

get_results(d_route, d_name, d_img, d_search_query_url, d_modifier);


function get_results(route, name, img, search_query_url, modifier) {
    
    $.ajax({url: search_query_url,method: "GET"}).then(function(response) {
        // Assign Base Response to a variable
        var recipe = response[route][0]
        console.log(recipe)
        // Assign Name to variable
        var recipe_name = recipe[name]
        console.log(recipe_name)
        // console.log(name)
        // Place Name in Element
        place_name(recipe_name, modifier);
        // Place Image in Element
        place_image(recipe, img, modifier)
        // Assign Element to Variable
        var ingredient_container_e = $("#" + modifier + "_ingredient_container");
        // Assign Element to Variable
        var ingredients_header_e = $("#" + modifier + "_ingredients_header");
        // Make the Label Bold
        ingredients_header_e.attr("style", "font-weight: bold;")
        // Create a Unordered List
        var ingredient_list_e= $("<ul>");
        // Place Ingredients in Elements
        place_ingredients(recipe, ingredient_list_e);
        // Create a label for the Instrucitons header
        var instructions_label_e = $("<label>");
        // Place Instuctions in Element
        create_instructions_label(instructions_label_e)
        // Create a paragraph tag for instructions
        var instructions_p_e = $("<p>");
        // Place Paragraph Tag on Page
        create_instructions(recipe, instructions_p_e);
        // Create a link for youtube link
        var youtube_link_e = $("<a>");
        // Place YouTube Link
        if (modifier === "meal"){
            place_link(recipe, recipe_name, youtube_link_e);
        }
        // Place Elements in Container
        ingredient_container_e.append(ingredients_header_e, ingredient_list_e, instructions_label_e, instructions_p_e, youtube_link_e);

    
    })  
}

function place_name(recipe_name, modifier) {
    // Assign Element to Variable
    var recipe_name_container_e = $("#" + modifier + "_recipe_name_container");
    // Assign Element to Variable
    var recipe_name_d_e = $("#" + modifier + "_recipe_name_d");
    // Update Name
    recipe_name_d_e.text(recipe_name)
    // Place Elements in Container
    recipe_name_container_e.append(recipe_name_d_e);
}

function place_image(recipe, img, modifier) {
    // Assign Img Response to Variable
    var img = recipe[img];
    console.log(img)
    // Assign Element to Variable
    var recipe_img_e = $("#" + modifier + "_recipe_img");
    // Assign src to img
    recipe_img_e.attr("src", img)
    // Assign height to img
    recipe_img_e.attr("height", "400px")
    // Assign width to img
    recipe_img_e.attr("width", "400px")
    // Assign CSS to img
    recipe_img_e.attr("style", "float: right; margin: 20px;")

}

function create_instructions_label(instructions_label_e){
    // Change Text
    instructions_label_e.text("Instructions")
    // Make Bold
    instructions_label_e.attr("style", "font-weight: bold;")
}

function create_instructions(recipe, instructions_p_e, ){
    // Assign Instruction to Variable
    var instructions = recipe.strInstructions
    // Change Text
    instructions_p_e.text(instructions)
}

function place_ingredients(recipe, ingredient_list_e) {
    // Loop Though all of the ingrednents
    for (var i = 0; i < 20; i++){
        // Assign measurments to variable
        var measurements = recipe["strMeasure" + i]
        // Assign ingredients to variable
        var ingredients = recipe["strIngredient" + i]
        // If the ingredient shows up to be null
        if (measurements != null || ingredients != null){
            // Create List element
            var ingredient_l_e= $("<li>");
            // Set list item text to measurments and ingredients
            ingredient_l_e.text(measurements + " " + ingredients)
            // if the measurments is an empty string
            if (measurements != ""){
                // Place the list elements into unordered list elements
                ingredient_list_e.append(ingredient_l_e);
            }
        }
    }
}

function place_link(recipe, recipe_name, youtube_link_e) {
    // Assign youtube link Response to Variable
    var youtube = recipe.strYoutube
    // Change Text to name
    youtube_link_e.text(recipe_name + " Video")
    // Assign link to source
    youtube_link_e.attr("src", youtube)
}





// function get_meal_results(meal_id) {
//     var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" +  meal_id
//     $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
//         // Assign Base Response to a variable
//         var meal = response.meals[0]
//         // Assign Name to variable
//         var meal_name = meal.strMeal
//         // Place Name in Element
//         place_name(meal_name);
//         // Place Image in Element
//         place_image(meal)
//         // Assign Element to Variable
//         var meal_ingredient_container_e = $("#meal_ingredient_container");
//         // Assign Element to Variable
//         var meal_ingredients_header_e = $("#meal_ingredients_header");
//         // Make the Label Bold
//         meal_ingredients_header_e.attr("style", "font-weight: bold;")
//         // Create a Unordered List
//         var meal_ingredient_list_e= $("<ul>");
//         // Place Ingredients in Elements
//         place_ingredients(meal, meal_ingredient_list_e);
//         // Create a label for the Instrucitons header
//         var meal_instructions_label_e = $("<label>");
//         // Place Instuctions in Element
//         create_instructions_label(meal_instructions_label_e)
//         // Create a paragraph tag for instructions
//         var meal_instructions_p_e = $("<p>");
//         // Place Paragraph Tag on Page
//         create_instructions(meal, meal_instructions_p_e);
//         // Create a link for youtube link
//         var meal_youtube_link_e = $("<a>");
//         // Place YouTube Link
//         place_link(meal, meal_name, meal_youtube_link_e);
//         // Place Elements in Container
//         meal_ingredient_container_e.append(meal_ingredients_header_e, meal_ingredient_list_e, meal_instructions_label_e, meal_instructions_p_e, meal_youtube_link_e);

    
//     })  
// }

// function place_name(meal_name) {
//     // Assign Element to Variable
//     var meal_recipe_name_container_e = $("#meal_recipe_name_container");
//     // Assign Element to Variable
//     var meal_recipe_name_d_e = $("#meal_recipe_name_d");
//     // Update Name
//     meal_recipe_name_d_e.text(meal_name)
//     // Place Elements in Container
//     meal_recipe_name_container_e.append(meal_recipe_name_d_e);
// }

// function place_image(meal) {
//     // Assign Img Response to Variable
//     var meal_img = meal.strMealThumb;
//     // Assign Element to Variable
//     var meal_recipe_img_e = $("#meal_recipe_img");
//     // Assign src to img
//     meal_recipe_img_e.attr("src", meal_img)
//     // Assign height to img
//     meal_recipe_img_e.attr("height", "400px")
//     // Assign width to img
//     meal_recipe_img_e.attr("width", "400px")
//     // Assign CSS to img
//     meal_recipe_img_e.attr("style", "float: right; margin: 20px;")

// }

// function create_instructions_label(meal_instructions_label_e){
//     // Change Text
//     meal_instructions_label_e.text("Instructions")
//     // Make Bold
//     meal_instructions_label_e.attr("style", "font-weight: bold;")
// }

// function create_instructions(meal, meal_instructions_p_e){
//     // Assign Instruction to Variable
//     var meal_instructions = meal.strInstructions
//     // Change Text
//     meal_instructions_p_e.text(meal_instructions)
// }

// function place_ingredients(meal, meal_ingredient_list_e) {
//     // Loop Though all of the ingrednents
//     for (var i = 0; i < 20; i++){
//         // Assign measurments to variable
//         var meal_measurements = meal["strMeasure" + i]
//         // Assign ingredients to variable
//         var meal_ingredients = meal["strIngredient" + i]
//         // If the ingredient shows up to be null
//         if (meal_measurements != null || meal_ingredients != null){
//             // Create List element
//             var meal_ingredient_l_e= $("<li>");
//             // Set list item text to measurments and ingredients
//             meal_ingredient_l_e.text(meal_measurements + " " + meal_ingredients)
//             // if the measurments is an empty string
//             if (meal_measurements != ""){
//                 // Place the list elements into unordered list elements
//                 meal_ingredient_list_e.append(meal_ingredient_l_e);
//             }
//         }
//     }
// }

// function place_link(meal, meal_name, meal_youtube_link_e) {
//     // Assign youtube link Response to Variable
//     var meal_youtube = meal.strYoutube
//     // Change Text to name
//     meal_youtube_link_e.text(meal_name + " Video")
//     // Assign link to source
//     meal_youtube_link_e.attr("src", meal_youtube)
// }





// function get_drink_results(drink_id) {
//     console.log(drink_id)
//     var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink_id
//     $.ajax({url: drink_search_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var drink = response.drinks[0]
//         console.log(drink)

//         var drink_name = response.drinks[0].strDrink
//         console.log(drink_name)
//         var drink_recipe_name_container_e = $("#drink_recipe_name_container");
//         drink_recipe_name_container_e.attr("style", "margin-top: 20px;")
//         var drink_recipe_name_d_e = $("#drink_recipe_name_d");
//         drink_recipe_name_d_e.text(drink_name)
//         // drink_recipe_name_container_e.append(drink_recipe_name_d_e);

//         var drink_img = response.drinks[0].strDrinkThumb;
//         console.log(drink_img)
//         var drink_recipe_img_e = $("#drink_recipe_img");
//         drink_recipe_img_e.attr("src", drink_img)
//         drink_recipe_img_e.attr("height", "400px")
//         drink_recipe_img_e.attr("width", "400px")
//         drink_recipe_img_e.attr("style", "float: right; margin: 20px;")
        
//         var drink_ingredient_container_e = $("#drink_ingredient_container");
//         var drink_instructions_label_e = $("<label>");
//         drink_instructions_label_e.text("Ingredients")
//         drink_instructions_label_e.attr("style", "font-weight: bold;")
//         drink_ingredient_container_e.append(drink_instructions_label_e);



//         var drink_ingredient_list_e= $("<ul>");
//         drink_ingredient_container_e.append(drink_ingredient_list_e);

//         for (var i = 0; i < 20; i++){
//             var drink_measurements = response.drinks[0]["strMeasure" + i]
//             var drink_ingredients = response.drinks[0]["strIngredient" + i]
            
//             if (drink_measurements != null || drink_ingredients != null){
//                 console.log(drink_ingredients + " " + drink_measurements)
//                 var drink_ingredient_l_e= $("<li>");
//                 // var drink_recipe_name_d_e = $("#drink_recipe_name_d");
//                 drink_ingredient_l_e.text(drink_measurements + " " + drink_ingredients)
//                 if (drink_measurements != ""){
//                     drink_ingredient_list_e.append(drink_ingredient_l_e);
//                 }
//             }
//             else if (drink_measurements === null || drink_ingredients === null){
//             }   
//         }
//         var drink_instructions_label_e = $("<label>");
//         drink_instructions_label_e.text("Instructions")
//         drink_instructions_label_e.attr("style", "font-weight: bold;")
//         drink_ingredient_container_e.append(drink_instructions_label_e);

//         var drink_instructions = response.drinks[0].strInstructions
//         console.log(drink_instructions)
//         var drink_instructions_p_e = $("<p>");
        
//         drink_instructions_p_e.text(drink_instructions)
//         drink_ingredient_container_e.append(drink_instructions_p_e);

//     })  
// }



// var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" +  meal_id
// get_results(meal_search_query_url);
// var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink_id
// get_results(drink_search_query_url);


// function get_results(search_query_url) {
    
//     $.ajax({url: search_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         // var meal = response.meals[0]
//         // console.log(meal)
    
//         var meal_name = response.meals[0].strMeal
//         console.log(meal_name)
//         var meal_recipe_name_container_e = $("#meal_recipe_name_container");
//         var meal_recipe_name_d_e = $("#meal_recipe_name_d");
//         get_data(meal_recipe_name_container_e, meal_recipe_name_d_e, meal_name)
        
    
//         var meal_img = response.meals[0].strMealThumb;
//         console.log(meal_img)
//         var meal_recipe_img_e = $("#meal_recipe_img");
//         meal_recipe_img_e.attr("src", meal_img)
//         meal_recipe_img_e.attr("height", "400px")
//         meal_recipe_img_e.attr("width", "400px")
//         meal_recipe_img_e.attr("style", "float: right; margin: 20px;")
        
//         var meal_ingredient_container_e = $("#meal_ingredient_container");
//         var meal_ingredients_header_e = $("#meal_ingredients_header");
//         // meal_ingredients_header_e.text("Instructions")
//         meal_ingredients_header_e.attr("style", "font-weight: bold;")
//         meal_ingredient_container_e.append(meal_ingredients_header_e);
    
//         var meal_ingredient_list_e= $("<ul>");
//         meal_ingredient_container_e.append(meal_ingredient_list_e);
    
        
    
//         for (var i = 0; i < 20; i++){
//             var meal_measurements = response.meals[0]["strMeasure" + i]
//             var meal_ingredients = response.meals[0]["strIngredient" + i]
            
//             if (meal_measurements != null || meal_ingredients != null){
//                 console.log(meal_ingredients + " " + meal_measurements)
//                 var meal_ingredient_l_e= $("<li>");
//                 // var meal_recipe_name_d_e = $("#meal_recipe_name_d");
//                 meal_ingredient_l_e.text(meal_measurements + " " + meal_ingredients)
//                 if (meal_measurements != ""){
//                     meal_ingredient_list_e.append(meal_ingredient_l_e);
//                 }
//             }
//             else if (meal_measurements === null || meal_ingredients === null){
//                 // console.log("")
//                 // break
//             }   
//         }
//         var meal_instructions_label_e = $("<label>");
//         meal_instructions_label_e.text("Instructions")
//         meal_instructions_label_e.attr("style", "font-weight: bold;")
//         meal_ingredient_container_e.append(meal_instructions_label_e);
    
//         var meal_instructions = response.meals[0].strInstructions
//         console.log(meal_instructions)
//         var meal_instructions_p_e = $("<p>");
        
//         meal_instructions_p_e.text(meal_instructions)
//         meal_ingredient_container_e.append(meal_instructions_p_e);
    
//         // <label class="uk-display-block" for="">Ingredient 1</label>
    
//         var meal_youtube = response.meals[0].strYoutube
//         console.log(meal_youtube)
//         var meal_youtube_link_e = $("<a>");
//         // var meal_ingredient_container_e = $("#meal_ingredient_container");
//         meal_youtube_link_e.text(meal_name + " Video")
//         meal_youtube_link_e.attr("src", meal_youtube)
//         meal_ingredient_container_e.append(meal_youtube_link_e);
    
//     })  
// }

// function get_data(meal_recipe_name_container_e, meal_recipe_name_d_e, meal_name) {
//     meal_recipe_name_d_e.text(meal_name)
//     meal_recipe_name_container_e.append(meal_recipe_name_d_e);
// }


// function create_elements() {
    
// }