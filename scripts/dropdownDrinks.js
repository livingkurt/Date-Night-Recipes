// Assign Element IDs to Variables
var search_i_d_e = $("#search_i");

// Get assign url to a variable
var searchTerm = window.location.search.slice(1);
// Use params from it
var params = new URLSearchParams(searchTerm);
// Get the specific id that was passed into the url
var drink_id = params.get("drink_id");
// Get the drink name from the url
var drink = params.get("drink");
// Get the specific id that was passed into the url
var meal_id = params.get("meal_id");
// If there is a drink
if (drink) {
  // The nget value from drink
  search_i_d_e.val(drink);
  // And start getting the results from the api from this function that is on script.js page 
  ingredient_d_api_call(drink);
}