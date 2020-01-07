var meal_search = "seafood";
var cocktail_search = "vodka"

var type = ["filter", "random", "categories"]


var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search
var coctail_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktail_search

var meal_filter_query_url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meal_search
var coctail_filter_query_url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + cocktail_search

var meal_category_query_url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
var coctail_category_query_url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"

var meals = "meals"
var drinks = "drinks"

meal_api_calls(meal_search_query_url)
cocktail_api_calls(coctail_search_query_url)
meal_api_calls(meal_filter_query_url)
cocktail_api_calls(coctail_filter_query_url)
meal_api_calls(meal_category_query_url)
cocktail_api_calls(coctail_category_query_url)


// function api_calls(query_url, type) {
//     $.ajax({url: query_url,method: "GET"}).then(function(response) {
//         // Assign Variables to Request
//         // console.log(query_url)
//         // console.log(type)
//         var data = response[type]
//         var array_len = data.length;
//         console.log(array_len)
//         var array_len = Object.keys(array_len).length;
//         for (var i = 0; i < array_len; i++){
//             console.log(data[i])
//         }
        
    
//     })  
// }

function meal_api_calls(query_url) {
    $.ajax({url: query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.meals.length;
        // var array_len = Object.keys(array_len).length;
        for (var i = 0; i < array_len; i++){
            console.log(response.meals[i])
        }
            
    
    })  
}

function cocktail_api_calls(query_url) {
    $.ajax({url: query_url,method: "GET"}).then(function(response) {
        // Assign Variables to Request
        var array_len = response.drinks.length;
        // var array_len = Object.keys(array_len).length;
        for (var i = 0; i < array_len; i++){
            console.log(response.drinks[i])
        }
        
    
    })  
}







// $.ajax({url: meal_category_query_url,method: "GET"}).then(function(response) {
//     // Assign Variables to Request
//     var array_len = response.meals.length;
//     // var array_len = Object.keys(array_len).length;
//     for (var i = 0; i < array_len; i++){
//         console.log(response.meals[i])
//     }
    

// })  

// $.ajax({url: coctail_category_query_url,method: "GET"}).then(function(response) {
//     // Assign Variables to Request
//     var array_len = response.drinks.length;
//     // var array_len = Object.keys(array_len).length;
//     for (var i = 0; i < array_len; i++){
//         console.log(response.drinks[i])
//     }
    

// }) 


// $.ajax({url: meal_search_query_url,method: "GET"}).then(function(response) {
//     // Assign Variables to Request
//     var array_len = response.meals.length;
//     // var array_len = Object.keys(array_len).length;
//     for (var i = 0; i < array_len; i++){
//         console.log(response.meals[i])
//     }
    

// })  

// $.ajax({url: coctail_search_query_url,method: "GET"}).then(function(response) {
//     // Assign Variables to Request
//     var array_len = response.drinks.length;
//     // var array_len = Object.keys(array_len).length;
//     for (var i = 0; i < array_len; i++){
//         console.log(response.drinks[i])
//     }
    
    
// })  

// $.ajax({url: meal_filter_query_url,method: "GET"}).then(function(response) {
//     // Assign Variables to Request
//     var array_len = response.meals.length;
//     // var array_len = Object.keys(array_len).length;
//     for (var i = 0; i < array_len; i++){
//         console.log(response.meals[i])
//     }
    
    
// })  

// $.ajax({url: coctail_filter_query_url,method: "GET"}).then(function(response) {
//     // Assign Variables to Request
//     var array_len = response.drinks.length;
//     // var array_len = Object.keys(array_len).length;
//     for (var i = 0; i < array_len; i++){
//         console.log(response.drinks[i])
//     }
    
    
// })  