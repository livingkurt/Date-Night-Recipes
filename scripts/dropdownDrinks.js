var search_i_d_e = $("#search_i_d");

console.log(window.location.search);
var searchTerm = window.location.search.slice(1);
var params = new URLSearchParams(searchTerm);
var drink_id = params.get("drink_id");
var drink = params.get("drink");
console.log(searchTerm);
if (drink) {
    search_i_d_e.val(drink);
    category_m_api_call(drink);

}

// function drinkSelection() {
//     document.getElementsByClassName("drinkNav")

// onclick(drinkSelection)