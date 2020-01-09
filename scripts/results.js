var params = new URLSearchParams(window.location.search.slice(1));
    if(params.has("meal_id") && params.has("drink_id")){
        var meal_id = params.get("meal_id");
        var drink_id = params.get("drink_id");
        console.log(meal_id, drink_id);
    }

get_meal_results(meal_id);
get_drink_results(drink_id);//the document is loaded by here, this is probably where you should do your stuff.


function get_meal_results(meal_id) {
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
    console.log(drink_id)
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





// var search_i_h_e = $("#search_i_h");
// var search_f_h_e = $("#search_f_h");
// var search_i_m_e = $("#search_i_m");
// var search_f_m_e = $("#search_f_m");
// var search_i_d_e = $("#search_i_d");
// var search_f_d_e = $("#search_f_d");
// var ready_b_e = $("#ready_b");
// var meal_results_c_e = $("#meal_results_c");
// var drink_results_c_e = $("#drink_results_c");
// var search_results_row_e = $("#search_results_row")



// function category_m_api_call(meal_search) {
//     search_results_row_e.empty();
//     var meal_category_query_url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
//     $.ajax({url: meal_category_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.meals.length;
//         var meal_cat_array = [];
//         for (var i = 0; i < array_len; i++){
//             var meal_cat = response.meals[i].strCategory
//             meal_cat_array.push(meal_cat.toLowerCase())
//         }
//         var meal_categories = meal_cat_array;
//         if (meal_categories.indexOf(meal_search) === "-1" || meal_categories.indexOf(meal_search) === -1) {
//             var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
//             meal_api_call(meal_search_query_url);

//         }
//         else {
//             var meal_filter_query_url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meal_search;
//             var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
//             meal_api_call(meal_filter_query_url);
//             meal_api_call(meal_search_query_url);
//         }
        

//     })  
// }

// function meal_api_call(meal_search_query_url) {
//     // var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
//     $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.meals.length;
//         var meal_img = response.meals[0]
//         for (var i = 0; i < array_len; i++){
//             var meal_name = response.meals[i].strMeal;
//             var meal_img = response.meals[i].strMealThumb;
//             var meal_id = response.meals[i].idMeal;
//             var meal_name_id = meal_name.replace(/[^a-zA-Z ]/g, "")
//             var meal_name_id = meal_name_id.split(' ').join('_')
//             // console.log(meal_name_id)
//             // meal_search_results(meal_name, meal_img, meal_id);
//             search_results(meal_name, meal_img, meal_id);
//             // meal_search_results(meal_name, meal_img);
//         }
//     })  
// }

// function ingredient_d_api_call(drink_search) {
//     search_results_row_e.empty();
//     var drink_ingredient_query_url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
//     $.ajax({url: drink_ingredient_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.drinks.length;
//         // var array_len = Object.keys(array_len).length;
//         var drink_ing_array = [];
//         for (var i = 0; i < array_len; i++){
//             // console.log(response.drinks[i].strCategory)
//             var drink_cat = response.drinks[i].strIngredient1
//             drink_ing_array.push(drink_cat.toLowerCase())
//         }
//         var drink_ingredients = drink_ing_array;
//         if (drink_ingredients.indexOf(drink_search) === "-1" || drink_ingredients.indexOf(drink_search) === -1) {
//             var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
//             drink_api_call(drink_search_query_url);
//         }
//         else {
//             var drink_filter_query_url = "https://www.thecocktaildb.com/api/json/filter/1/filter.php?s=" + drink_search;
//             var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
//             drink_api_call(drink_filter_query_url);
//             drink_api_call(drink_search_query_url);
            

//         }
        

//     }) 
// }

// function drink_api_call(drink_search_query_url) {
//     // var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
//     $.ajax({url: drink_search_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.drinks.length;
        
//         // var array_len = Object.keys(array_len).length;
//         for (var i = 0; i < array_len; i++){
//             // console.log(response.drinks[i])
//             var drink_name = response.drinks[i].strDrink;
//             var drink_name_id = drink_name.replace(/[^a-zA-Z ]/g, "")
//             var drink_name_id = drink_name_id.split(' ').join('_')
//             console.log(drink_name_id)
//             var drink_img = response.drinks[i].strDrinkThumb;
//             var drink_id = response.drinks[i].idDrink;
//             console.log(drink_id)
//             // drink_search_results(drink_name, drink_img, drink_name_id, drink_id);
//             search_results(drink_name, drink_img, drink_id);
//         }
        
        
//     }) 
    
//     // change_to_results_page();
// } 


// function search_results(name, img, id) {
//     var row_result_e = $("<div>"); // <div>
//     var result_name_e = $("<div>");// <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
//     var result_div_e = $("<div>"); // <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
//     // <div class="">Meal Name</div>
//     var result_img_e = $("<img>"); // <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
//     var result_small_div_e = $("<div>"); // <div class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
//     var result_h6_e = $("<h6>"); // <div>
    
//     row_result_e.attr("style", "width: 400px;")
//     row_result_e.attr("id", id)
//     row_result_e.attr("class", "results_container")
//     result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
//     result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
//     result_img_e.attr("src", img);
//     result_name_e.text(name)
    
//     search_results_row_e.append(row_result_e);
//     row_result_e.append(result_name_e, result_div_e);
//     result_div_e.append(result_img_e) // result_small_div_e
//     result_small_div_e.append(result_h6_e)
// }


// function change_to_meal_page() {
//     window.open('meals.html', '_self');
// }

// function change_to_drink_page() {
//     window.open('drinks.html', '_self');
// }

// function change_to_results_page() {
//     window.open('results.html', '_self');
// }

// $(document).on('click', '.results_container' , function(event){
//     // if ($(document).URL.contains("meals.html") ) {

//     if (window.location.href.indexOf("meals") > -1) {
//         // alert("your url contains the name franky");
//         // }
//         //Code here
//         var final_meal = $(this)
//         console.log(final_meal)
//         var final_meal_id = $(this).attr("id")
//         console.log(final_meal_id)
//         // window.final_meal_id = final_meal_id;
//         window.open('drinks.html?meal_id=' + final_meal_id, '_self');
//     }
//     else if (window.location.href.indexOf("drinks") > -1) {
//         //Code here
//         var final_drink_id = $(this).attr("id")
//         console.log(final_drink_id)
//         var params = new URLSearchParams(window.location.search.slice(1));
//         var final_meal_id = params.get("meal_id");
//         console.log(final_meal_id)
//         window.open('results.html?meal_id=' + final_meal_id + '&drink_id=' + final_drink_id, '_self')
//     }
    

// })


// // Home
// search_f_h_e.on("submit", function(event){
//     event.preventDefault();
//     var search = search_i_h_e.val();
    
//     var meal_search = search.toLowerCase();
//     console.log(meal_search)
//     // var drink_search = drink_search.toLowerCase();
//     category_m_api_call(meal_search);
//     // ingredient_d_api_call();
//   });
// // Meals
// search_f_m_e.on("submit", function(event){
//     event.preventDefault();
//     var search = search_i_m_e.val();

//     var meal_search = search.toLowerCase();
//     console.log(meal_search)
//     // var drink_search = drink_search.toLowerCase();
//     category_m_api_call(meal_search);
//     // ingredient_d_api_call();
// });
// // Drinks
// search_f_d_e.on("submit", function(event){
//     event.preventDefault();
//     var search = search_i_d_e.val();

//     var drink_search = search.toLowerCase();
//     console.log(drink_search)
//     // var drink_search = drink_search.toLowerCase();
//     ingredient_d_api_call(drink_search);
//     // ingredient_d_api_call();
// });

// ready_b_e.on("click", function(event){
//     event.preventDefault();

//     change_to_meal_page();
//     // ingredient_d_api_call();
// });






// Older 



// var search_i_h_e = $("#search_i_h");
// var search_f_h_e = $("#search_f_h");
// var search_i_m_e = $("#search_i_m");
// var search_f_m_e = $("#search_f_m");
// var search_i_d_e = $("#search_i_d");
// var search_f_d_e = $("#search_f_d");
// var ready_b_e = $("#ready_b");
// var meal_results_c_e = $("#meal_results_c");
// var drink_results_c_e = $("#drink_results_c");
// var search_results_row_e = $("#search_results_row")

// function category_m_api_call(meal_search) {
//     search_results_row_e.empty();
//     var meal_category_query_url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
//     $.ajax({url: meal_category_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.meals.length;
//         var meal_cat_array = [];
//         for (var i = 0; i < array_len; i++){
//             var meal_cat = response.meals[i].strCategory
//             meal_cat_array.push(meal_cat.toLowerCase())
//         }
//         var meal_categories = meal_cat_array;
//         if (meal_categories.indexOf(meal_search) === "-1" || meal_categories.indexOf(meal_search) === -1) {
//             var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
//             meal_api_call(meal_search_query_url);

//         }
//         else {
//             var meal_filter_query_url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meal_search;
//             var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
//             meal_api_call(meal_filter_query_url);
//             meal_api_call(meal_search_query_url);
//         }
        

//     })  
// }

// function meal_api_call(meal_search_query_url) {
//     // var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
//     $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.meals.length;
//         var meal_img = response.meals[0]
//         for (var i = 0; i < array_len; i++){
//             var meal_name = response.meals[i].strMeal;
//             var meal_img = response.meals[i].strMealThumb;
//             var meal_id = response.meals[i].idMeal;
//             var meal_name_id = meal_name.replace(/[^a-zA-Z ]/g, "")
//             var meal_name_id = meal_name_id.split(' ').join('_')
//             // console.log(meal_name_id)
//             meal_search_results(meal_name, meal_img, meal_id);
//             // meal_search_results(meal_name, meal_img);
//         }
//     })  
// }

// function meal_search_results(meal_name, meal_img, meal_id) {
//     var row_result_e = $("<div>"); // <div>
//     var result_name_e = $("<div>");// <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
//     var result_div_e = $("<div>"); // <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
//     // <div class="">Meal Name</div>
//     var result_img_e = $("<img>"); // <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
//     var result_small_div_e = $("<div>"); // <div class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
//     var result_h6_e = $("<h6>"); // <div>

//     // console.log(meal_name)
    
//     row_result_e.attr("style", "width: 400px;")
//     row_result_e.attr("id", meal_id);
//     row_result_e.attr("class", "m_results_container")
//     // row_result_e.attr("onclick", "get_result()");
//     result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
//     result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
//     result_img_e.attr("src", meal_img);
//     result_name_e.text(meal_name)
    
//     search_results_row_e.append(row_result_e);
//     row_result_e.append(result_name_e, result_div_e);
//     result_div_e.append(result_img_e) // , result_small_div_e
//     result_small_div_e.append(result_h6_e)
    
// }



// function ingredient_d_api_call(drink_search) {
//     search_results_row_e.empty();
//     var drink_ingredient_query_url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
//     $.ajax({url: drink_ingredient_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.drinks.length;
//         // var array_len = Object.keys(array_len).length;
//         var drink_ing_array = [];
//         for (var i = 0; i < array_len; i++){
//             // console.log(response.drinks[i].strCategory)
//             var drink_cat = response.drinks[i].strIngredient1
//             drink_ing_array.push(drink_cat.toLowerCase())
//         }
//         var drink_ingredients = drink_ing_array;
//         if (drink_ingredients.indexOf(drink_search) === "-1" || drink_ingredients.indexOf(drink_search) === -1) {
//             var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
//             drink_api_call(drink_search_query_url);
//         }
//         else {
//             var drink_filter_query_url = "https://www.thecocktaildb.com/api/json/filter/1/filter.php?s=" + drink_search;
//             var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
//             drink_api_call(drink_filter_query_url);
//             drink_api_call(drink_search_query_url);
            

//         }
        

//     }) 
// }

// function drink_api_call(drink_search_query_url) {
//     // var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
//     $.ajax({url: drink_search_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.drinks.length;
        
//         // var array_len = Object.keys(array_len).length;
//         for (var i = 0; i < array_len; i++){
//             // console.log(response.drinks[i])
//             var drink_name = response.drinks[i].strDrink;
//             var drink_name_id = drink_name.replace(/[^a-zA-Z ]/g, "")
//             var drink_name_id = drink_name_id.split(' ').join('_')
//             console.log(drink_name_id)
//             var drink_img = response.drinks[i].strDrinkThumb;
//             var drink_id = response.drinks[i].idDrink;
//             console.log(drink_id)
//             drink_search_results(drink_name, drink_img, drink_name_id, drink_id);
//         }
        
        
//     }) 
    
//     // change_to_results_page();
// } 

// function drink_search_results(drink_name, drink_img, drink_name_id, drink_id) {
//     var row_result_e = $("<div>"); // <div>
//     var result_name_e = $("<div>");// <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
//     var result_div_e = $("<div>"); // <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
//     // <div class="">Meal Name</div>
//     var result_img_e = $("<img>"); // <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
//     var result_small_div_e = $("<div>"); // <div class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
//     var result_h6_e = $("<h6>"); // <div>
    
//     row_result_e.attr("style", "width: 400px;")
//     row_result_e.attr("id", drink_id)
//     row_result_e.attr("class", "d_results_container")
//     result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
//     result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
//     result_img_e.attr("src", drink_img);
//     result_name_e.text(drink_name)
    
//     search_results_row_e.append(row_result_e);
//     row_result_e.append(result_name_e, result_div_e);
//     result_div_e.append(result_img_e) // result_small_div_e
//     result_small_div_e.append(result_h6_e)
// }

// function drink_search_results(drink_name, drink_img, drink_name_id, drink_id) {
//     var row_result_e = $("<div>"); // <div>
//     var result_name_e = $("<div>");// <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
//     var result_div_e = $("<div>"); // <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
//     // <div class="">Meal Name</div>
//     var result_img_e = $("<img>"); // <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
//     var result_small_div_e = $("<div>"); // <div class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
//     var result_h6_e = $("<h6>"); // <div>
    
//     row_result_e.attr("style", "width: 400px;")
//     row_result_e.attr("id", drink_id)
//     row_result_e.attr("class", "d_results_container")
//     result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
//     result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
//     result_img_e.attr("src", drink_img);
//     result_name_e.text(drink_name)
    
//     search_results_row_e.append(row_result_e);
//     row_result_e.append(result_name_e, result_div_e);
//     result_div_e.append(result_img_e) // result_small_div_e
//     result_small_div_e.append(result_h6_e)
// }


// function change_to_meal_page() {
//     window.open('meals.html', '_self');
// }

// function change_to_drink_page() {
//     window.open('drinks.html', '_self');
// }

// function change_to_results_page() {
//     window.open('results.html', '_self');
// }

// $(document).on('click', '.m_results_container' , function(event){
//     var final_meal_id = $(this).attr("id")
//     console.log(final_meal_id)
//     window.final_meal_id = final_meal_id;
//     window.open('drinks.html?meal_id=' + final_meal_id, '_self');
    

// })

// $(document).on('click', '.d_results_container' , function(event){
//     var final_drink_id = $(this).attr("id")
//     console.log(final_drink_id)
//     var params = new URLSearchParams(window.location.search.slice(1));
//     var final_meal_id = params.get("meal_id");
//     console.log(final_meal_id)
//     window.open('results.html?meal_id=' + final_meal_id + '&drink_id=' + final_drink_id, '_self')

// })


// // Home
// search_f_h_e.on("submit", function(event){
//     event.preventDefault();
//     var search = search_i_h_e.val();
    
//     var meal_search = search.toLowerCase();
//     console.log(meal_search)
//     // var drink_search = drink_search.toLowerCase();
//     category_m_api_call(meal_search);
//     // ingredient_d_api_call();
//   });
// // Meals
// search_f_m_e.on("submit", function(event){
//     event.preventDefault();
//     var search = search_i_m_e.val();

//     var meal_search = search.toLowerCase();
//     console.log(meal_search)
//     // var drink_search = drink_search.toLowerCase();
//     category_m_api_call(meal_search);
//     // ingredient_d_api_call();
// });
// // Drinks
// search_f_d_e.on("submit", function(event){
//     event.preventDefault();
//     var search = search_i_d_e.val();

//     var drink_search = search.toLowerCase();
//     console.log(drink_search)
//     // var drink_search = drink_search.toLowerCase();
//     ingredient_d_api_call(drink_search);
//     // ingredient_d_api_call();
// });

// ready_b_e.on("click", function(event){
//     event.preventDefault();

//     change_to_meal_page();
//     // ingredient_d_api_call();
// });