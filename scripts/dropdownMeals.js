var search_i_m_e = $("#search_i_m");

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
var body = document.body,
html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
console.log(height)
if (height > 2500){
    $("body").css("height", "unset")
}
// console.log(window.location.search);
// var searchTerm = window.location.search.slice(6);
// console.log(searchTerm);
// search_i_m_e.val(searchTerm);