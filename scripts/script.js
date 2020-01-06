https://openwhyd.org/adrien/playlist/61/format=links

var queryURL = "https://openwhyd.org/adrien/playlist/10?format=links&limit=1" // + "q=" + search_city + "&units=imperial&appid=" + APIKey;

$.ajax({url: queryURL, method: "GET"}).then(function(response) {
    // Assign Variables to Request
    console.log(response)
    
    
})  