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
    
    var meal_category_query_url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
    $.ajax({url: meal_category_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.meals.length;
        // var array_len = Object.keys(array_len).length;
        var meal_cat_array = [];
        for (var i = 0; i < array_len; i++){
            // console.log(response.meals[i].strCategory)
            var meal_cat = response.meals[i].strCategory
            meal_cat_array.push(meal_cat.toLowerCase())
        }
        var meal_categories = meal_cat_array;
        // console.log(meal_categories)
        // meal_search_api_call();
        // var a = meal_categories.indexOf(meal_search);
        // console.log(a)
        if (meal_categories.indexOf(meal_search) === "-1" || meal_categories.indexOf(meal_search) === -1) {
            meal_search_api_call(meal_search);
            // console.log("goodbye")
        }
        else {
        // else if (meal_categories.indexOf(drink_search) != "-1" || meal_categories.indexOf(drink_search) != -1){
        
            meal_filter_api_call(meal_search);
            // console.log("hello")
        }
        

    })  
}

function meal_search_api_call(meal_search) {
    // var meal_search = meal_search
    // console.log(meal_search)
    var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
    $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.meals.length;
        var meal_name = response.meals[0].strMeal;
        // var array_len = Object.keys(array_len).length;
        for (var i = 0; i < array_len; i++){
            // console.log(response.meals[i])
            var meal_name = response.meals[i].strMeal;
            meal_search_results(meal_name);
        }


        // meal_filter_api_call(meal_search);
        
    })  
   
    // change_to_drink_page();
    // meal_search_results(array_len);
}

function meal_filter_api_call(meal_search) {
    // var meal_search = meal_search
    console.log("hello")
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

            meal_search_results(meal_name);
        }
        // console.log(array_len)
        meal_search_api_call(meal_search);
        
        
        
    })  
    
    // change_to_drink_page();
    

}

function meal_search_results(meal_name) {
    var row_result_e = $("<div>");
    create_div(row_result_e, meal_name);
}

function create_div(row_result_e, meal_name){
    //Create Each row
    console.log(meal_name)
    row_result_e.attr("class", "uk-text-center");
    row_result_e.attr("style", "display: flex; border: 1px solid black; height: 50px;");
    row_result_e.text(meal_name)
    meal_results_c_e.append(row_result_e);
}

function ingredient_d_api_call(drink_search) {
    
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
        // console.log(drink_ingredients)
        // var fruits = ["Banana", "Orange", "Apple", "Mango"];
        // var a = drink_ingredients.indexOf(drink_search);
        // console.log(a)
        console.log(drink_search)
        if (drink_ingredients.indexOf(drink_search) === "-1" || drink_ingredients.indexOf(drink_search) === -1) {
            drink_filter_api_call(drink_search);
            // console.log("hello")
        }
        // else if (drink_ingredients.indexOf(drink_search) != "-1" || drink_ingredients.indexOf(drink_search) != -1){
            
        //     drink_search_api_call();
        //     console.log("goodbye")
        else {
            // else if (meal_categories.indexOf(drink_search) != "-1" || meal_categories.indexOf(drink_search) != -1){
            
            drink_search_api_call(drink_search);
            // console.log("hello")
        }
        

    }) 
}


function drink_search_api_call(drink_search) {
    var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
    $.ajax({url: drink_search_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.drinks.length;
        // var array_len = Object.keys(array_len).length;
        for (var i = 0; i < array_len; i++){
            console.log(response.drinks[i])
        }
        
        
    }) 
    drink_filter_api_call(drink_search);
    // change_to_results_page();
} 

function drink_filter_api_call(drink_search) {
    var drink_filter_query_url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink_search;
    $.ajax({url: drink_filter_query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.drinks.length;
        // var array_len = Object.keys(array_len).length;
        for (var i = 0; i < array_len; i++){
            console.log(response.drinks[i])
        }
        
        
    })  
    // change_to_results_page();
}




function drink_search_results() {
    
}


function change_to_meal_page() {
    window.open('meals.html');
}

function change_to_drink_page() {
    window.open('drinks.html');
}

function change_to_results_page() {
    window.open('results.html');
}






// searches_div.on("click",recent_searches);




// search_f_e.addEventListener("keypress", function (e,event) {
//     event.preventDefault();
//     if (e.key === 'Enter') {
//         console.log("enter")
//         // next_question();
        
//         // get_todays_weather(search); 
//       }
// })



// meal_api_calls(meal_search_query_url)
// drink_api_calls(drink_search_query_url)
// meal_api_calls(meal_filter_query_url)
// drink_api_calls(drink_filter_query_url)
// meal_api_calls(meal_category_query_url)
// drink_api_calls(drink_category_query_url)


// // function api_calls(query_url, type) {
// //     $.ajax({url: query_url,method: "GET"}).then(function(response) {
// //         // Assign Variables to Request
// //         // console.log(query_url)
// //         // console.log(type)
// //         var data = response[type]
// //         var array_len = data.length;
// //         console.log(array_len)
// //         var array_len = Object.keys(array_len).length;
// //         for (var i = 0; i < array_len; i++){
// //             console.log(data[i])
// //         }
        
    
// //     })  
// // }

// function meal_api_calls(query_url) {
//     $.ajax({url: query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.meals.length;
//         // var array_len = Object.keys(array_len).length;
//         for (var i = 0; i < array_len; i++){
//             console.log(response.meals[i])
//         }
            
    
//     })  
// }

// function drink_api_calls(query_url) {
//     $.ajax({url: query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         var array_len = response.drinks.length;
//         // var array_len = Object.keys(array_len).length;
//         for (var i = 0; i < array_len; i++){
//             console.log(response.drinks[i])
//         }
        
    
//     })  
// }

