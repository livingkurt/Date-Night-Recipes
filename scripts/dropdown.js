var search_i_m_e = $("#search_i_m");

var enterKey = jQuery.Event("keydown");
enterKey.which=13;

console.log(window.location.search)
var searchTerm = window.location.search.slice(6)
console.log(searchTerm)
search_i_m_e.val(searchTerm)
enterKey

