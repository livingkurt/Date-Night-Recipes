// var meal_search = "chicken";
// var drink_search = "Vodka"

var search_i_h_e = $("#search_i_h");
var search_f_h_e = $("#search_f_h");
var search_i_m_e = $("#search_i_m");
var search_f_m_e = $("#search_f_m");
var search_i_d_e = $("#search_i_d");
var search_f_d_e = $("#search_f_d");
var ready_b_e = $("#ready_b");
var meal_results_c_e = $("#meal_results_c");
var drink_results_c_e = $("#drink_results_c");
var search_results_row_e = $("#search_results_row")


// var type = ["filter", "random", "categories"]


// var meals = "meals";
// var drinks = "drinks";


// Home
search_f_h_e.on("submit", function(event){
    event.preventDefault();
    var search = search_i_h_e.val();
    
    var meal_search = search.toLowerCase();
    console.log(meal_search)
    // var drink_search = drink_search.toLowerCase();
    category_m_api_call(meal_search);
    // ingredient_d_api_call();
  });
// Meals
search_f_m_e.on("submit", function(event){
    event.preventDefault();
    var search = search_i_m_e.val();

    var meal_search = search.toLowerCase();
    console.log(meal_search)
    // var drink_search = drink_search.toLowerCase();
    category_m_api_call(meal_search);
    // ingredient_d_api_call();
});
// Drinks
search_f_d_e.on("submit", function(event){
    event.preventDefault();
    var search = search_i_d_e.val();

    var drink_search = search.toLowerCase();
    console.log(drink_search)
    // var drink_search = drink_search.toLowerCase();
    ingredient_d_api_call(drink_search);
    // ingredient_d_api_call();
});

ready_b_e.on("click", function(event){
    event.preventDefault();

    change_to_meal_page();
    // ingredient_d_api_call();
});




function category_m_api_call(meal_search) {
    search_results_row_e.empty();
    var meal_category_query_url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
    $.ajax({url: meal_category_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.meals.length;
        var meal_cat_array = [];
        for (var i = 0; i < array_len; i++){
            var meal_cat = response.meals[i].strCategory
            meal_cat_array.push(meal_cat.toLowerCase())
        }
        var meal_categories = meal_cat_array;
        if (meal_categories.indexOf(meal_search) === "-1" || meal_categories.indexOf(meal_search) === -1) {
            meal_search_api_call(meal_search);
        }
        else {
            meal_filter_api_call(meal_search);
        }
        

    })  
}

function meal_search_api_call(meal_search) {
    var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
    $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.meals.length;
        // var meal_name = response.meals[0].strMeal;
        // var meal_data = response.meals[0]
        // console.log(meal_data)
        var meal_img = response.meals[0]
        for (var i = 0; i < array_len; i++){
            var meal_name = response.meals[i].strMeal;
            var meal_img = response.meals[i].strMealThumb;
            var meal_name_id = meal_name.replace(/[^a-zA-Z ]/g, "")
            var meal_name_id = meal_name_id.split(' ').join('_')
            // console.log(meal_name_id)
            
            meal_search_results(meal_name, meal_img, meal_name_id);
            // meal_search_results(meal_name, meal_img);
        }
    })  
}

function meal_filter_api_call(meal_search) {
    // var meal_search = meal_search
    
    var meal_filter_query_url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meal_search;
    $.ajax({url: meal_filter_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.meals.length;
        var meal_name = response.meals[0].strMeal;
        
        // var array_len = Object.keys(array_len).length;
        // var meal_name_array = [];
        for (var i = 0; i < array_len; i++){
            // console.log(response.meals[i])
            var meal_name = response.meals[i].strMeal;
            var meal_img = response.meals[i].strMealThumb;
            var meal_name_id = meal_name.replace(/[^a-zA-Z ]/g, "")
            var meal_name_id = meal_name_id.split(' ').join('_')
            console.log(meal_name_id)
            meal_search_results(meal_name, meal_img, meal_name_id);
        }
        // console.log(array_len)
        meal_search_api_call(meal_search);
        
        
        
    })  
    
    // change_to_drink_page();
    

}

function meal_search_results(meal_name, meal_img, meal_name_id) {
    var row_result_e = $("<div>"); // <div>
    var result_name_e = $("<div>");// <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
    var result_div_e = $("<div>"); // <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
    // <div class="">Meal Name</div>
    var result_img_e = $("<img>"); // <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
    var result_small_div_e = $("<div>"); // <div class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
    var result_h6_e = $("<h6>"); // <div>

    // console.log(meal_name)
    
    row_result_e.attr("style", "width: 400px;")
    row_result_e.attr("id", meal_name_id);
    row_result_e.attr("class", "results_container")
    row_result_e.attr("onclick", "get_result()");
    result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
    result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
    result_img_e.attr("src", meal_img);
    // result_img_e.attr("height", "300px");
    // result_img_e.attr("width", "300px");
    // result_small_div_e.attr("class", "uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default");
    // result_h6_e.attr("class", "uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default");
    result_name_e.text(meal_name)
    
    search_results_row_e.append(row_result_e);
    row_result_e.append(result_name_e, result_div_e);
    result_div_e.append(result_img_e) // , result_small_div_e
    result_small_div_e.append(result_h6_e)
    
    // <div>
    //     <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
    //     <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
    //         <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
    //         <div
    //             class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
    //             <h6>Select</h6>
    //         </div>
    //     </div>
    // </div>


    // meal_create_div(row_result_e, meal_name);
}

// function meal_create_div(row_result_e, meal_name){
//     //Create Each row
//     console.log(meal_name)
//     row_result_e.attr("class", "uk-card uk-card-default uk-card-body");
//     // row_result_e.attr("style", "display: flex; border: 1px solid black; height: 50px;");
//     row_result_e.text(meal_name)
    
//     meal_results_c_e.append(row_result_e);
// }



function ingredient_d_api_call(drink_search) {
    search_results_row_e.empty();
    var drink_ingredient_query_url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    $.ajax({url: drink_ingredient_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.drinks.length;
        // var array_len = Object.keys(array_len).length;
        var drink_ing_array = [];
        for (var i = 0; i < array_len; i++){
            // console.log(response.drinks[i].strCategory)
            var drink_cat = response.drinks[i].strIngredient1
            drink_ing_array.push(drink_cat.toLowerCase())
        }
        var drink_ingredients = drink_ing_array;
        if (drink_ingredients.indexOf(drink_search) === "-1" || drink_ingredients.indexOf(drink_search) === -1) {
            drink_search_api_call(drink_search);
        }
        else {
            // else if (meal_categories.indexOf(drink_search) != "-1" || meal_categories.indexOf(drink_search) != -1){
            drink_filter_api_call(drink_search);
            

        }
        

    }) 
}


function drink_search_api_call(drink_search) {
    // console.log(drink_search)
    // console.log("hello")
    var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
    $.ajax({url: drink_search_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.drinks.length;
        
        // var array_len = Object.keys(array_len).length;
        for (var i = 0; i < array_len; i++){
            // console.log(response.drinks[i])
            var drink_name = response.drinks[i].strDrink;
            var drink_name_id = drink_name.replace(/[^a-zA-Z ]/g, "")
            var drink_name_id = drink_name_id.split(' ').join('_')
            console.log(drink_name_id)
            var drink_img = response.drinks[i].strDrinkThumb;
            
            drink_search_results(drink_name, drink_img, drink_name_id);
        }
        
        
    }) 
    
    // change_to_results_page();
} 

function drink_filter_api_call(drink_search) {
    // console.log("goodbye")
    var drink_filter_query_url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink_search;
    $.ajax({url: drink_filter_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.drinks.length;
        // var array_len = Object.keys(array_len).length;
        // console.log(array_len)
        for (var i = 0; i < array_len; i++){
            // console.log(response.drinks[i])
            var drink_name = response.drinks[i].strDrink;
            var drink_name_id = drink_name.replace(/[^a-zA-Z ]/g, "")
            var drink_name_id = drink_name_id.split(' ').join('_')
            console.log(drink_name_id)
            var drink_img = response.drinks[i].strDrinkThumb;
            drink_search_results(drink_name, drink_img, drink_name_id);

        }
        drink_search_api_call(drink_search);
        
    })  
    // change_to_results_page();
}




function drink_search_results(drink_name, drink_img, drink_name_id) {
    var row_result_e = $("<div>"); // <div>
    var result_name_e = $("<div>");// <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
    var result_div_e = $("<div>"); // <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
    // <div class="">Meal Name</div>
    var result_img_e = $("<img>"); // <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
    var result_small_div_e = $("<div>"); // <div class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
    var result_h6_e = $("<h6>"); // <div>

    // console.log(drink_name)
    
    row_result_e.attr("style", "width: 400px;")
    row_result_e.attr("id", drink_name_id)
    row_result_e.attr("class", "results_container")
    result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
    result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
    result_img_e.attr("src", drink_img);
    // result_img_e.attr("height", "300px");
    // result_img_e.attr("width", "300px");
    // result_small_div_e.attr("class", "uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default");
    // result_h6_e.attr("class", "uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default");
    result_name_e.text(drink_name)
    
    search_results_row_e.append(row_result_e);
    row_result_e.append(result_name_e, result_div_e);
    result_div_e.append(result_img_e) // result_small_div_e
    result_small_div_e.append(result_h6_e)
}

// function drink_create_div(row_result_e, drink_name){
//     //Create Each row
//     console.log(drink_name)
//     row_result_e.attr("class", "uk-text-center");
//     row_result_e.attr("style", "display: flex; border: 1px solid black; height: 50px;");
//     row_result_e.text(drink_name)
    
//     drink_results_c_e.append(row_result_e);
// }


function change_to_meal_page() {
    window.open('meals.html', '_self');
}

function change_to_drink_page() {
    window.open('drinks.html', '_self');
}

function change_to_results_page() {
    window.open('results.html', '_self');
}
var container_e = $(".alllllsls");

container_e.on("click", function(event){
    // event.preventDefault();
    console.log("hello")
    console.log(this)
});

// $(".results").on("click", get_result);

function get_result(event) {
    // event.preventDefault();
    console.log("hello")
    console.log($(this.currentTarget))
    // change_to_meal_page();
    // ingredient_d_api_call();
};

$('.results_container').on('click', '.cheap', function(){
    $(this)
})


var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772"
$.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
    // Assign Variables to Request
    var meal = response.meals[0]
    console.log(meal)
    var meal_name = response.meals[0].strMeal
    console.log(meal_name)
    for (var i = 0; i < 20; i++){
        var meal_measurements = response.meals[0]["strMeasure" + i]
        var meal_ingredients = response.meals[0]["strIngredient" + i]
        console.log(meal_measurements + " " + meal_ingredients)
    }
    var meal_instructions = response.meals[0].strInstructions
    console.log(meal_instructions)

})  

var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007"
$.ajax({url: drink_search_query_url,method: "GET"}).then(function(response) {
    // Assign Variables to Request
    var drink = response.drinks[0]
    console.log(drink)
    var drink_name = response.drinks[0].strDrink
    console.log(drink_name)
    for (var i = 0; i < 20; i++){
        var drink_measurements = response.drinks[0]["strMeasure" + i]
        var drink_ingredients = response.drinks[0]["strIngredient" + i]
        console.log(drink_measurements + " " + drink_ingredients)
    }
    var drink_instructions = response.drinks[0].strInstructions
    console.log(drink_instructions)
})  