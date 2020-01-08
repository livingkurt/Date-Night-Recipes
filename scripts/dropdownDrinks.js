var search_i_d_e = $("#search_i_d");

// function drinkSelection() {
//     document.getElementsByClassName("drinkNav")

// onclick(drinkSelection)

console.log(window.location.search);
var searchTerm = window.location.search.slice(1);
var params = new URLSearchParams(searchTerm);
var meal_id = params.get("meal_id");
var drink = params.get("drink");
console.log(searchTerm);
if (drink) {
    search_i_d_e.val(drink);
}