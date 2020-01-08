var params = new URLSearchParams(window.location.search.slice(1));
    if(params.has("meal_id") && params.has("drink_id")){
        var meal_id = params.get("meal_id");
        var drink_id = params.get("drink_id");
        console.log(meal_id, drink_id);
    }


// console.log(final_meal_id)
// console.log(final_drink_id)
// });
// window.open('results.html?drink_id=' + final_drink_id, '_self');
// $(win.document).ready(function() {
// console.log(final_meal_id)
// console.log(final_drink_id)
get_meal_results(meal_id);
get_drink_results(drink_id);//the document is loaded by here, this is probably where you should do your stuff.


function get_meal_results(meal_id) {
    // console.log(final_meal_id)
    // window.final_meal_id
    // console.log(final_meal_id)
    // final_meal_id = final_meal_id.toString()
    // final_drink_id = 11007
    // var final_meal_id = localStorage.getItem("meal_id");
    // var meal_id = params.get("meal_id");
    var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" +  meal_id
    $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var meal = response.meals[0]
        console.log(meal)
    
        var meal_name = response.meals[0].strMeal
        console.log(meal_name)
        var meal_recipe_name_container_e = $("#meal_recipe_name_container");
        var meal_recipe_name_d_e = $("#meal_recipe_name_d");
        meal_recipe_name_d_e.text(meal_name)
        meal_recipe_name_container_e.append(meal_recipe_name_d_e);
    
        var meal_img = response.meals[0].strMealThumb;
        console.log(meal_img)
        var meal_recipe_img_e = $("#meal_recipe_img");
        meal_recipe_img_e.attr("src", meal_img)
        meal_recipe_img_e.attr("height", "400px")
        meal_recipe_img_e.attr("width", "400px")
        meal_recipe_img_e.attr("style", "float: right; margin: 20px;")
        
        var meal_ingredient_container_e = $("#meal_ingredient_container");
        var meal_ingredients_header_e = $("#meal_ingredients_header");
        // meal_ingredients_header_e.text("Instructions")
        meal_ingredients_header_e.attr("style", "font-weight: bold;")
        meal_ingredient_container_e.append(meal_ingredients_header_e);
    
        var meal_ingredient_list_e= $("<ul>");
        meal_ingredient_container_e.append(meal_ingredient_list_e);
    
        
    
        for (var i = 0; i < 20; i++){
            var meal_measurements = response.meals[0]["strMeasure" + i]
            var meal_ingredients = response.meals[0]["strIngredient" + i]
            
            if (meal_measurements != null || meal_ingredients != null){
                console.log(meal_ingredients + " " + meal_measurements)
                var meal_ingredient_l_e= $("<li>");
                // var meal_recipe_name_d_e = $("#meal_recipe_name_d");
                meal_ingredient_l_e.text(meal_measurements + " " + meal_ingredients)
                if (meal_measurements != ""){
                    meal_ingredient_list_e.append(meal_ingredient_l_e);
                }
            }
            else if (meal_measurements === null || meal_ingredients === null){
                // console.log("")
                // break
            }   
        }
        var meal_instructions_label_e = $("<label>");
        meal_instructions_label_e.text("Instructions")
        meal_instructions_label_e.attr("style", "font-weight: bold;")
        meal_ingredient_container_e.append(meal_instructions_label_e);
    
        var meal_instructions = response.meals[0].strInstructions
        console.log(meal_instructions)
        var meal_instructions_p_e = $("<p>");
        
        meal_instructions_p_e.text(meal_instructions)
        meal_ingredient_container_e.append(meal_instructions_p_e);
    
        // <label class="uk-display-block" for="">Ingredient 1</label>
    
        var meal_youtube = response.meals[0].strYoutube
        console.log(meal_youtube)
        var meal_youtube_link_e = $("<a>");
        // var meal_ingredient_container_e = $("#meal_ingredient_container");
        meal_youtube_link_e.text(meal_name + " Video")
        meal_youtube_link_e.attr("src", meal_youtube)
        meal_ingredient_container_e.append(meal_youtube_link_e);
    
    })  
}


function get_drink_results(drink_id) {
    // var drink_id = params.get("drink_id");
    // var final_drink_id = localStorage.getItem("drink_id");
    console.log(drink_id)
    // final_drink_id = final_drink_id.toString()
    var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink_id
    $.ajax({url: drink_search_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var drink = response.drinks[0]
        console.log(drink)

        var drink_name = response.drinks[0].strDrink
        console.log(drink_name)
        var drink_recipe_name_container_e = $("#drink_recipe_name_container");
        drink_recipe_name_container_e.attr("style", "margin-top: 20px;")
        var drink_recipe_name_d_e = $("#drink_recipe_name_d");
        drink_recipe_name_d_e.text(drink_name)
        // drink_recipe_name_container_e.append(drink_recipe_name_d_e);

        var drink_img = response.drinks[0].strDrinkThumb;
        console.log(drink_img)
        var drink_recipe_img_e = $("#drink_recipe_img");
        drink_recipe_img_e.attr("src", drink_img)
        drink_recipe_img_e.attr("height", "400px")
        drink_recipe_img_e.attr("width", "400px")
        drink_recipe_img_e.attr("style", "float: right; margin: 20px;")
        
        var drink_ingredient_container_e = $("#drink_ingredient_container");
        var drink_instructions_label_e = $("<label>");
        drink_instructions_label_e.text("Ingredients")
        drink_instructions_label_e.attr("style", "font-weight: bold;")
        drink_ingredient_container_e.append(drink_instructions_label_e);



        var drink_ingredient_list_e= $("<ul>");
        drink_ingredient_container_e.append(drink_ingredient_list_e);

        for (var i = 0; i < 20; i++){
            var drink_measurements = response.drinks[0]["strMeasure" + i]
            var drink_ingredients = response.drinks[0]["strIngredient" + i]
            
            if (drink_measurements != null || drink_ingredients != null){
                console.log(drink_ingredients + " " + drink_measurements)
                var drink_ingredient_l_e= $("<li>");
                // var drink_recipe_name_d_e = $("#drink_recipe_name_d");
                drink_ingredient_l_e.text(drink_measurements + " " + drink_ingredients)
                if (drink_measurements != ""){
                    drink_ingredient_list_e.append(drink_ingredient_l_e);
                }
            }
            else if (drink_measurements === null || drink_ingredients === null){
            }   
        }
        var drink_instructions_label_e = $("<label>");
        drink_instructions_label_e.text("Instructions")
        drink_instructions_label_e.attr("style", "font-weight: bold;")
        drink_ingredient_container_e.append(drink_instructions_label_e);

        var drink_instructions = response.drinks[0].strInstructions
        console.log(drink_instructions)
        var drink_instructions_p_e = $("<p>");
        
        drink_instructions_p_e.text(drink_instructions)
        drink_ingredient_container_e.append(drink_instructions_p_e);

    })  
}