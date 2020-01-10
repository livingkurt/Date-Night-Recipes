
// Assign Element IDs to Variables
var search_i_e = $("#search_i");
var search_f_e = $("#search_f");
var ready_b_e = $("#ready_b");
var meal_results_c_e = $("#meal_results_c");
var drink_results_c_e = $("#drink_results_c");
var search_results_row_e = $("#search_results_row")

// On meal page when you type in a food or meal into the search bar and press enter 
function category_m_api_call(meal_search) {
    // Remove all Previous Elements from container
    search_results_row_e.empty();
    // Assign Category Query URL to Variable
    var meal_category_query_url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
    // Ajax Request to meal categories in mealdb API
    $.ajax({ url: meal_category_query_url, method: "GET" }).then(function (response) {
        // Get the length of the search
        var array_len = response.meals.length;
        // Create empty array with all of the categories to compare the search to
        var meal_cat_array = [];
        // Loop to create array with the categories
        for (var i = 0; i < array_len; i++) {
            // Response for Categories
            var meal_cat = response.meals[i].strCategory
            // Add call response to array while changing them all to lower case
            meal_cat_array.push(meal_cat.toLowerCase())
        }
        // Reassign the cateogry array to a new variable
        var meal_categories = meal_cat_array;
        // If the meal search input is the not in the meal categories list
        if (meal_categories.indexOf(meal_search) === "-1" || meal_categories.indexOf(meal_search) === -1) {
            // Use this as the query url
            var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
            // Call Function that ends up actually getting the search results
            meal_api_call(meal_search_query_url);

        }
        // If the meal search input is in the meal categories list
        else {
            // Use this as the query url
            var meal_filter_query_url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meal_search;
            // Call Function that ends up actually getting the search results
            meal_api_call(meal_filter_query_url);
            // And Use this as the query url
            var meal_search_query_url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal_search;
            // Call Function that ends up actually getting the search results
            meal_api_call(meal_search_query_url);
        }


    })
}
// Makes API Call for meal and gets search data back
function meal_api_call(meal_search_query_url) {
    // Ajax Request to search for meals in mealdb API
    $.ajax({ url: meal_search_query_url, method: "GET" }).then(function (response) {
        // Get the length of the search
        var array_len = response.meals.length;
        // Loop to get all of the information for the search results based on how many items there are
        for (var i = 0; i < array_len; i++) {
            // Assign The Meal Name to Variable
            var meal_name = response.meals[i].strMeal;
            // Assign The Meal Image to Variable
            var meal_img = response.meals[i].strMealThumb;
            // Assign The Meal ID to Variable
            var meal_id = response.meals[i].idMeal;
            // Call Function that creates the elements for the search results
            search_results(meal_name, meal_img, meal_id);
        }
    })
}

// On drink page when you type in a food or meal into the search bar and press enter 
function ingredient_d_api_call(drink_search) {
    // Remove all Previous Elements from container
    search_results_row_e.empty();
    // Assign ingredient Query URL to Variable
    var drink_ingredient_query_url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list";
    // Ajax Request to drink ingredient in cocktaildb API
    $.ajax({ url: drink_ingredient_query_url, method: "GET" }).then(function (response) {
        // Get the length of the search
        var array_len = response.drinks.length;
        // Create empty array with all of the ingredient to compare the search t
        var drink_ing_array = [];
        // Loop to create array with the ingredient
        for (var i = 0; i < array_len; i++) {
            // Response for ingredient
            var drink_cat = response.drinks[i].strIngredient1
            // Add call response to array while changing them all to lower case
            drink_ing_array.push(drink_cat.toLowerCase())
        }
        // Reassign the cateogry array to a new variable
        var drink_ingredients = drink_ing_array;
        // If the drink search input is the not in the drink ingredients list
        if (drink_ingredients.indexOf(drink_search) === "-1" || drink_ingredients.indexOf(drink_search) === -1) {
            // Use this as the query url
            var drink_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink_search;
            // Call Function that ends up actually getting the search results
            drink_api_call(drink_search_query_url);
        }
        else {
            // Use this as the query url
            var drink_filter_query_url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drink_search;
            // Call Function that ends up actually getting the search results
            drink_api_call(drink_filter_query_url);
        }
    })
}

// Makes API Call for drink and gets search data back
function drink_api_call(drink_search_query_url) {
    // Ajax Request to search for meals in drinkdb API
    console.log(drink_search_query_url)
    $.ajax({ url: drink_search_query_url, method: "GET" }).then(function (response) {
        // Get the length of the search
        var array_len = response.drinks.length;
        // Loop to get all of the information for the search results based on how many items there are
        for (var i = 0; i < array_len; i++) {
            // Assign The Drink Name to Variable
            var drink_name = response.drinks[i].strDrink;
            // Assign The Drink Image to Variable
            var drink_img = response.drinks[i].strDrinkThumb;
            // Assign The Drink ID to Variable
            var drink_id = response.drinks[i].idDrink;
            // Call Function that creates the elements for the search results
            search_results(drink_name, drink_img, drink_id);
        }
    })
}

// Creates the elements and attributes them from the search results
function search_results(name, img, id) {

    
    var x = "Total Height: " + screen.height;
    // console.log(x)
    var body = document.body,
    html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    console.log(height)
    if (height >= 2022){
        $("body").css("height", "unset")
    }
    else if (height < 1500){
        $("body").css("height", "100%")
    }
    // Creates a container div
    var row_result_e = $("<div>");
    // Changes Styling
    row_result_e.attr("style", "width: 400px;")
    // Adds the search id to element id
    row_result_e.attr("id", id)
    // Adds a class to the container div
    row_result_e.attr("class", "results_container")
    // Placesthe container div to a parent div
    search_results_row_e.attr("style", "margin-bottom: 50px;")
    search_results_row_e.append(row_result_e);

    // Creates a div for name
    var result_name_e = $("<div>");
    // Adds a class to the div
    result_name_e.attr("class", "uk-card uk-card-default uk-card-body");
    // Adds round edges of container
    result_name_e.attr("style", "border-radius: 25px; opacity: 0.9; font-size: 20px;");
    // Changes to Search Result Name
    result_name_e.text(name)

    // Creates a div for image
    var result_div_e = $("<div>");
    // Adds a class to the div
    result_div_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline uk-margin");
    // Adds round edges of container
    result_div_e.attr("style", "border-radius: 25px; 25px; opacity: 0.9; ");
    // Creates img element
    var result_img_e = $("<img>");
    // Adds the response img
    result_img_e.attr("src", img);
    // Adds round edges of container
    result_img_e.attr("style", "border-radius: 25px; 25px; border: 4px solid #d8d8d8;");
    // Places the img in parent div
    result_div_e.append(result_img_e)
    // Places the name and div in parent div
    row_result_e.append(result_name_e, result_div_e);
}

// When you click on a search result on either the meals or drink page
$(document).on('click', '.results_container', function (event) {
    // If you are on the meals.html page
    if (window.location.href.indexOf("meals") > -1) {
        // Assign the id that from the user chosen search result
        var final_meal_id = $(this).attr("id")
        // Open Drinks page and store id data inside of the url
        var url = 'drinks.html?meal_id=' + final_meal_id;
        var params = new URLSearchParams(window.location.search.slice(1));
        if (params.has("drink_id")) {
            url += "&drink_id=" + params.get("drink_id");
        }
        window.open(url, '_self');
    }
    // If you are on the drinks.html page
    else if (window.location.href.indexOf("drinks") > -1) {
        // Assign the id that from the user chosen search result
        var final_drink_id = $(this).attr("id")
        // Assign the last part of the url to variable
        var params = new URLSearchParams(window.location.search.slice(1));
        // Get the meal id from the url
        var final_meal_id = params.get("meal_id");
        // Open Results page and store id data inside of the url
        window.open('results.html?meal_id=' + final_meal_id + '&drink_id=' + final_drink_id, '_self')
    }


})
// When the user presses enter after putting in a search
search_f_e.on('submit', function (event) {
    // Will Stop Page Refresh
    event.preventDefault();
    // Assigns Search Value to Variable
    var search = search_i_e.val();
    // If you are on the meals.html page
    if (window.location.href.indexOf("meals") > -1) {
        // Changes search result to lowercase
        var meal_search = search.toLowerCase();
        // Starts the the search process on the meal page
        category_m_api_call(meal_search);
    }
    // If you are on the drinks.html page
    else if (window.location.href.indexOf("drinks") > -1) {
        // Changes search result to lowercase
        var drink_search = search.toLowerCase();
        // Starts the the search process on the drink page
        ingredient_d_api_call(drink_search);
    }
})



// Button on home page
ready_b_e.on("click", function (event) {
    // Will Stop Page Refresh
    event.preventDefault();
    // Opens Meal Page
    window.open('meals.html', '_self');
});

// Warning, major hack
// Try and preserve the querystring for everylink that is clicked on
$("a").on("click", function (event) {
    event.preventDefault();
    var oldParams = new URLSearchParams(window.location.search.slice(1));

    var params = event.target.getAttribute("href").split("?");
    if (params[1]) {
        var newParams = new URLSearchParams(params[1]);
        newParams.forEach(function (value, key) {
            if (value) {
                oldParams.set(key, value);
            }
            oldParams.set(key, value)
        })
    }
    window.location.href = (params[0] + "?" + oldParams.toString())


})
