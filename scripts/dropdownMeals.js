var search_i_m_e = $("#search_i");

console.log(window.location.search);
var searchTerm = window.location.search.slice(1);
var params = new URLSearchParams(searchTerm);
var meal_id = params.get("meal_id");
var meal = params.get("meal");
console.log(searchTerm);
if (meal) {
    search_i_m_e.val(meal);
    category_m_api_call(meal);
}

// console.log(window.location.search);
// var searchTerm = window.location.search.slice(6);
// console.log(searchTerm);
// search_i_m_e.val(searchTerm);