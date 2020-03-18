// Assign Element IDs to Variables
var search_i_m_e = $("#search_i");

// Get assign url to a variable
var searchTerm = window.location.search.slice(1);
// Use params from it
var params = new URLSearchParams(searchTerm);
// Get the specific id that was passed into the url
var meal_id = params.get("meal_id");
// Get the meal name from the url
var meal = params.get("meal");
// If there is a meal
if (meal) {
  // The get value from meal
  search_i_m_e.val(meal);
  // And start getting the results from the api from this function that is on script.js page 
  category_m_api_call(meal);
}
