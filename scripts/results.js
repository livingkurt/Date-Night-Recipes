// Assign Url to params variable
var params = new URLSearchParams(window.location.search.slice(1));
// If the params has a meal_id and a drink_id
if (params.has("meal_id") && params.has("drink_id")) {
  // Get the meal_id
  var meal_id = params.get("meal_id");
  // Get the drink_id
  var drink_id = params.get("drink_id");
}
// if the meal_id is undefined
if (meal_id === undefined) {
  // Make the results container be hidden
  $("#results_container").attr("style", "display: none;")
  // Create a button and assign it to a variable
  var no_results = $("<button>");
  // Assign Element to variable
  var results_div = $("#results_results")
  // Assign text to button
  no_results.text("No Recipes at this Time")
  // Assign classes to the button
  no_results.attr("class", "uk-card uk-card-default uk-card-body uk-inline box")
  // Assign an id to the button
  no_results.attr("id", "no_results")
  // Place the button on the page
  results_div.append(no_results)
}
// When you click on the no results button
$(no_results).on("click", function (event) {
  // Prevent Default
  event.preventDefault();
  // Redirect to the home page
  window.open("index.html", '_self');
})

// Data to be run through the api calls
const api_calls = async () => {
  var m_route = "meals"
  var m_modifier = "meal"
  var m_name = "strMeal"
  var m_img = "strMealThumb"
  var m_search_query_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal_id
  // Run functions with meal specific data
  await get_results(m_route, m_name, m_img, m_search_query_url, m_modifier);

  var d_route = "drinks"
  var d_modifier = "drink"
  var d_name = "strDrink"
  var d_img = "strDrinkThumb"
  var d_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink_id
  // Run functions with drink specific data
  await get_results(d_route, d_name, d_img, d_search_query_url, d_modifier);
}
// Start running script
api_calls()

function get_results(route, name, img, search_query_url, modifier) {
  // Remove height from body
  $("body").css("height", "unset")
  // Make call to api
  $.ajax({ url: search_query_url, method: "GET" }).then(function (response) {
    // Assign Base Response to a variable
    var recipe = response[route][0]
    // Assign Name to variable
    var recipe_name = recipe[name]
    // Place Name in Element
    var recipe_name_d_e = $("#" + modifier + "_recipe_name_d");
    // Update Name
    recipe_name_d_e.text(recipe_name)
    // Place Image in Element
    place_image(recipe, img, modifier)
    // Assign Element to Variable
    var ingredient_container_e = $("#" + modifier + "_ingredient_container");
    // Assign style to Element
    ingredient_container_e.attr("style", "opacity: .9; width: 100%; border-radius: 20px;  font-weight: bold; color: black;")
    // Assign Element to Variable
    var ingredients_header_e = $("#" + modifier + "_ingredients_header");
    // Make the Label Bold
    ingredients_header_e.attr("style", "font-weight: bold; color: black;")
    // Assign Element to variable
    var instructions_container_e = $("#" + modifier + "_instuctions_container")
    // Assign classes to Element
    instructions_container_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline")
    // Create a Unordered List
    var ingredient_list_e = $("<ul>");
    // Place Ingredients in Elements+
    place_ingredients(recipe, ingredient_list_e);
    // Create a label for the Instrucitons header
    var instructions_label_e = $("<label>");
    // Place Instuctions in Element
    create_instructions_label(instructions_label_e)
    // Create a paragraph tag for instructions
    var instructions_list_e = $("<ol>");
    // Place Paragraph Tag on Page
    create_instructions(recipe, instructions_list_e);
    // Create a link for youtube link
    var youtube_link_e = $("<a>");
    // Place YouTube Link
    if (modifier === "meal") {
      place_link(recipe, recipe_name, youtube_link_e);
    }
    // Place Elements in Container
    ingredient_container_e.append(ingredients_header_e, ingredient_list_e);
    instructions_container_e.append(instructions_label_e, instructions_list_e, youtube_link_e)
  })
}

function place_image(recipe, img, modifier) {
  // Assign Img Response to Variable
  var img = recipe[img];
  // Assign Element to Variable
  var recipe_img_e = $("#" + modifier + "_recipe_img");
  // Assign src to img
  recipe_img_e.attr("src", img)
  // Assign height to img
  recipe_img_e.attr("height", "400px")
  // Assign width to img
  recipe_img_e.attr("width", "400px")
  // Assign CSS to img
  // recipe_img_e.attr("style", "float: right; margin: 20px; border-radius: 20px;")

}

function create_instructions_label(instructions_label_e) {
  // Change Text
  instructions_label_e.text("Instructions")
  // Make Bold
  instructions_label_e.attr("style", "font-weight: bold;")
}

function place_ingredients(recipe, ingredient_list_e) {
  // Loop Though all of the ingrednents
  for (var i = 0; i < 20; i++) {
    // Assign measurments to variable
    var measurements = recipe["strMeasure" + i]
    // Assign ingredients to variable
    var ingredients = recipe["strIngredient" + i]
    console.log({ "measurements": measurements, "ingredients": ingredients })
    // If the ingredient shows up to be null
    if (measurements != null || ingredients != null) {
      if (measurements === " " || ingredients === " " || measurements === undefined || ingredients === undefined) {
        console.log("No More Ingredients")
      }
      else {
        // Create List element
        var ingredient_l_e = $("<li>");
        // Set list item text to measurments and ingredients
        ingredient_l_e.text(measurements + " " + ingredients)
        // if the measurments is an empty string
        if (measurements != "") {
          // Place the list elements into unordered list elements
          ingredient_list_e.append(ingredient_l_e);
        }
      }

    }
  }
}

function create_instructions(recipe, instructions_list_e, ) {
  // Assign Instruction to Variable
  var instructions = recipe.strInstructions
  if (instructions === null) {
    instructions = "No Instructions Available"
  }
  // Split instructions at the period which adds it all to an array
  var instructions_array = instructions.split("."); // .join(".<br/>")
  // Get the instructions length
  var instructions_len = instructions_array.length - 1;
  // Loop through the instructions array
  for (var i = 0; i < instructions_len; i++) {
    // Create a list element
    var instructions_list_item_e = $("<li>");
    // If there their are empty instructions don't place them
    if (instructions_array[i] === "") {
      console.log(instructions_array[i])
    }
    else {
      // Add each instruction item to the li element
      instructions_list_item_e.text(instructions_array[i] + ".")
      // Place list element on ordered list element
      instructions_list_e.append(instructions_list_item_e);

    }

  }
}



function place_link(recipe, recipe_name, youtube_link_e) {
  // Assign youtube link Response to Variable
  var youtube = recipe.strYoutube
  // Change Text to name
  youtube_link_e.text(recipe_name + " Video")
  // Assign link to source
  youtube_link_e.attr("href", youtube)
  youtube_link_e.attr("target", "_blank")
}
