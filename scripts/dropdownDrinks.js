var search_i_d_e = $("#search_i_d");




console.log(window.location.search);
var searchTerm = window.location.search.slice(1);
var params = new URLSearchParams(searchTerm);
var drink_id = params.get("drink_id");
var drink = params.get("drink");
console.log(searchTerm);
if (drink) {
    search_i_d_e.val(drink);
    ingredient_d_api_call(drink);
    
}

// // When you click on a search result on either the meals or drink page
// $(document).on('click', '.results_container', function (event) {
//     // If you are on the meals.html page
//     if (window.location.href.indexOf("meals") > -1) {
//         // Assign the id that from the user chosen search result
//         var final_meal_id = $(this).attr("id")
//         // Open Drinks page and store id data inside of the url
//         window.open('drinks.html?meal_id=' + final_meal_id, '_self');
//     }
//     // If you are on the drinks.html page
//     else if (window.location.href.indexOf("drinks") > -1) {
//         // Assign the id that from the user chosen search result
//         var final_drink_id = $(this).attr("id")
//         // Assign the last part of the url to variable
//         var params = new URLSearchParams(window.location.search.slice(1));
//         // Get the meal id from the url
//         var final_meal_id = params.get("meal_id");
//         // Open Results page and store id data inside of the url
//         window.open('results.html?meal_id=' + final_meal_id + '&drink_id=' + final_drink_id, '_self')
//     }


// function drinkSelection() {
//     document.getElementsByClassName("drinkNav")

// onclick(drinkSelection)