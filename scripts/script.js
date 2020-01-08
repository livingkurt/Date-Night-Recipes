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
            var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
            meal_api_call(meal_search_query_url);

        }
        else {
            var meal_filter_query_url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meal_search;
            var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
            meal_api_call(meal_filter_query_url);
            meal_api_call(meal_search_query_url);
        }
        

    })  
}

function meal_api_call(meal_search_query_url) {
    // var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
    $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.meals.length;
        var meal_img = response.meals[0]
        for (var i = 0; i < array_len; i++){
            var meal_name = response.meals[i].strMeal;
            var meal_img = response.meals[i].strMealThumb;
            var meal_id = response.meals[i].idMeal;
            var meal_name_id = meal_name.replace(/[^a-zA-Z ]/g, "")
            var meal_name_id = meal_name_id.split(' ').join('_')
            // console.log(meal_name_id)
            // meal_search_results(meal_name, meal_img, meal_id);
            meal_search_results(meal_name, meal_img, meal_id);
            // meal_search_results(meal_name, meal_img);
        }
    })  
}

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
//             meal_search_api_call(meal_search);
//         }
//         else {
//             meal_filter_api_call(meal_search);
//         }
        

//     })  
// }

// function meal_search_api_call(meal_search) {
//     var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
//     $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.meals.length;
//         // var meal_name = response.meals[0].strMeal;
//         // var meal_data = response.meals[0]
//         // console.log(meal_data)
//         var meal_img = response.meals[0]
//         for (var i = 0; i < array_len; i++){
//             var meal_name = response.meals[i].strMeal;
//             var meal_img = response.meals[i].strMealThumb;
//             var meal_id = response.meals[i].idMeal;
//             var meal_name_id = meal_name.replace(/[^a-zA-Z ]/g, "")
//             var meal_name_id = meal_name_id.split(' ').join('_')
//             // console.log(meal_name_id)
            
//             meal_search_results(meal_name, meal_img, meal_name_id, meal_id);
//             // meal_search_results(meal_name, meal_img);
//         }
//     })  
// }

// function meal_filter_api_call(meal_search) {
//     // var meal_search = meal_search
    
//     var meal_filter_query_url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meal_search;
//     $.ajax({url: meal_filter_query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.meals.length;
//         var meal_name = response.meals[0].strMeal;
        
//         // var array_len = Object.keys(array_len).length;
//         // var meal_name_array = [];
//         for (var i = 0; i < array_len; i++){
//             // console.log(response.meals[i])
//             var meal_name = response.meals[i].strMeal;
//             var meal_img = response.meals[i].strMealThumb;
//             var meal_id = response.meals[i].idMeal;
//             console.log(meal_id)
//             var meal_name_id = meal_name.replace(/[^a-zA-Z ]/g, "")
//             var meal_name_id = meal_name_id.split(' ').join('_')
//             console.log(meal_name_id)
//             meal_search_results(meal_name, meal_img, meal_name_id, meal_id);
//         }
//         // console.log(array_len)
//         meal_search_api_call(meal_search);
        
        
        
//     })  
    
//     // change_to_drink_page();
    

// }

function meal_search_results(meal_name, meal_img, meal_id) {
    var row_result_e = $("<div>"); // <div>
    var result_name_e = $("<div>");// <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
    var result_div_e = $("<div>"); // <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
    // <div class="">Meal Name</div>
    var result_img_e = $("<img>"); // <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
    var result_small_div_e = $("<div>"); // <div class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
    var result_h6_e = $("<h6>"); // <div>

    // console.log(meal_name)
    
    row_result_e.attr("style", "width: 400px;")
    row_result_e.attr("id", meal_id);
    row_result_e.attr("class", "m_results_container")
    // row_result_e.attr("onclick", "get_result()");
    result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
    result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
    result_img_e.attr("src", meal_img);
    result_name_e.text(meal_name)
    
    search_results_row_e.append(row_result_e);
    row_result_e.append(result_name_e, result_div_e);
    result_div_e.append(result_img_e) // , result_small_div_e
    result_small_div_e.append(result_h6_e)
    
}



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
            var drink_id = response.drinks[i].idDrink;
            console.log(drink_id)
            drink_search_results(drink_name, drink_img, drink_name_id, drink_id);
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
            var drink_id = response.drinks[i].idDrink;
            console.log(drink_id)
            drink_search_results(drink_name, drink_img, drink_name_id, drink_id);

        }
        drink_search_api_call(drink_search);
        
    })  
    // change_to_results_page();
}




function drink_search_results(drink_name, drink_img, drink_name_id, drink_id) {
    var row_result_e = $("<div>"); // <div>
    var result_name_e = $("<div>");// <div class="uk-card uk-card-default uk-card-body">Meal Name</div>
    var result_div_e = $("<div>"); // <div class="uk-card uk-card-default uk-card-body uk-inline uk-margin">
    // <div class="">Meal Name</div>
    var result_img_e = $("<img>"); // <img src="https://via.placeholder.com/150x150.png" alt="Placeholder">
    var result_small_div_e = $("<div>"); // <div class="uk-position-medium uk-position-bottom-center uk-overlay uk-overlay-default">
    var result_h6_e = $("<h6>"); // <div>
    
    row_result_e.attr("style", "width: 400px;")
    row_result_e.attr("id", drink_id)
    row_result_e.attr("class", "d_results_container")
    result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
    result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
    result_img_e.attr("src", drink_img);
    result_name_e.text(drink_name)
    
    search_results_row_e.append(row_result_e);
    row_result_e.append(result_name_e, result_div_e);
    result_div_e.append(result_img_e) // result_small_div_e
    result_small_div_e.append(result_h6_e)
}


function change_to_meal_page() {
    window.open('meals.html', '_self');
}

function change_to_drink_page() {
    window.open('drinks.html', '_self');
}

function change_to_results_page() {
    window.open('results.html', '_self');
}

$(document).on('click', '.m_results_container' , function(event){
    var final_meal_id = $(this).attr("id")
    console.log(final_meal_id)
    window.final_meal_id = final_meal_id;
    window.open('drinks.html?meal_id=' + final_meal_id, '_self');
    

})

$(document).on('click', '.d_results_container' , function(event){
    var final_drink_id = $(this).attr("id")
    console.log(final_drink_id)
    var params = new URLSearchParams(window.location.search.slice(1));
    var final_meal_id = params.get("meal_id");
    console.log(final_meal_id)
    window.open('results.html?meal_id=' + final_meal_id + '&drink_id=' + final_drink_id, '_self')

})


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