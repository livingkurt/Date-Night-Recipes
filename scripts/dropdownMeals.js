var search_i_m_e = $("#search_i_m");


console.log(window.location.search);
var searchTerm = window.location.search.slice(6);
console.log(searchTerm);
search_i_m_e.val(searchTerm);