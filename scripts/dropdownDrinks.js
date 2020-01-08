var search_i_d_e = $("#search_i_d");


console.log(window.location.search);
var searchTerm = window.location.search.slice(7);
console.log(searchTerm);
search_i_d_e.val(searchTerm);