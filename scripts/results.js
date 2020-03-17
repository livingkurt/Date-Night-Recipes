var params = new URLSearchParams(window.location.search.slice(1));
if (params.has("meal_id") && params.has("drink_id")) {
  var meal_id = params.get("meal_id");
  var drink_id = params.get("drink_id");
  console.log(meal_id, drink_id);
}
console.log(meal_id)

if (meal_id === undefined) {
  console.log("is null")
  $("#results_container").attr("style", "display: none;")
  var no_results = $("<div>");
  var results_div = $("#results_results")
  no_results.text("No Recipes at this Time")
  no_results.attr("class", "uk-card uk-card-default uk-card-body uk-inline box red")
  no_results.attr("id", "no_results")
  no_results.attr("style", "text-align: center; display: flex; border-radius: 20px; font-size: 65px; color: white; margin-top: 200px; justify-content: center;")
  results_div.append(no_results)


}

const api_calls = async () => {
  var m_route = "meals"
  var m_modifier = "meal"
  var m_name = "strMeal"
  var m_img = "strMealThumb"
  var m_search_query_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal_id

  await get_results(m_route, m_name, m_img, m_search_query_url, m_modifier);

  var d_route = "drinks"
  var d_modifier = "drink"
  var d_name = "strDrink"
  var d_img = "strDrinkThumb"
  var d_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink_id

  await get_results(d_route, d_name, d_img, d_search_query_url, d_modifier);

  // var m_route = "drinks"
  // var m_modifier = "drink"
  // var m_name = "strDrink"
  // var m_img = "strDrinkThumb"
  // var m_search_query_url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drink_id
  // debugger;
  // await get_results(m_route, m_name, m_img, m_search_query_url, m_modifier);
}
// debugger;
api_calls()





function get_results(route, name, img, search_query_url, modifier) {
  $("body").css("height", "unset")

  $.ajax({ url: search_query_url, method: "GET" }).then(function (response) {
    // Assign Base Response to a variable
    var recipe = response[route][0]
    console.log(recipe)
    // Assign Name to variable
    var recipe_name = recipe[name]
    console.log(recipe_name)
    // console.log(name)
    // Place Name in Element
    var recipe_name_d_e = $("#" + modifier + "_recipe_name_d");
    place_name(recipe_name, modifier, recipe_name_d_e);
    // Place Image in Element
    place_image(recipe, img, modifier)
    // Assign Element to Variable
    var ingredient_container_e = $("#" + modifier + "_ingredient_container");

    ingredient_container_e.attr("style", "opacity: .9; width: 100%; border-radius: 20px;  font-weight: bold; color: black;")
    // Assign Element to Variable
    var ingredients_header_e = $("#" + modifier + "_ingredients_header");
    // Make the Label Bold
    ingredients_header_e.attr("style", "font-weight: bold; color: black;")
    // Create a Unordered List
    var instructions_container_e = $("#" + modifier + "_instuctions_container")
    instructions_container_e.attr("class", "uk-card uk-card-default uk-card-body uk-inline")
    instructions_container_e.attr("style", "border-radius: 20px; width: 100%; margin-top: 10px; opacity: .9;  margin-bottom: 50px;  font-weight: bold; color: black;;")

    var ingredient_list_e = $("<ul>");

    // Place Ingredients in Elements+
    place_ingredients(recipe, ingredient_list_e);
    // Create a label for the Instrucitons header
    var instructions_label_e = $("<label>");
    // Place Instuctions in Element
    create_instructions_label(instructions_label_e)
    // Create a paragraph tag for instructions
    // var instructions_p_e = $("<p>");
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
    ingredient_container_e.append(recipe_name_d_e, ingredients_header_e, ingredient_list_e);
    instructions_container_e.append(instructions_label_e, instructions_list_e, youtube_link_e)


  })
}

function place_name(recipe_name, modifier) {
  // Assign Element to Variable
  // var recipe_name_container_e = $("#" + modifier + "_recipe_name_container");
  // Assign Element to Variable
  var drink_name_container = $("#drink_recipe_name_container");
  drink_name_container.attr("style", "display: none;")
  var recipe_name_d_e = $("#" + modifier + "_recipe_name_d");
  recipe_name_d_e.attr("style", "margin-top: 0px; font-size: 30px; font-weight: bold;");
  // Update Name
  recipe_name_d_e.text(recipe_name)
  // Place Elements in Container
  // recipe_name_container_e.append(recipe_name_d_e);
}

function place_image(recipe, img, modifier) {
  // Assign Img Response to Variable
  var img = recipe[img];
  console.log(img)
  // Assign Element to Variable
  var recipe_img_e = $("#" + modifier + "_recipe_img");
  // Assign src to img
  recipe_img_e.attr("src", img)
  // Assign height to img
  recipe_img_e.attr("height", "400px")
  // Assign width to img
  recipe_img_e.attr("width", "400px")
  // Assign CSS to img
  recipe_img_e.attr("style", "float: right; margin: 20px; border-radius: 20px;")

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
    // If the ingredient shows up to be null
    if (measurements != null || ingredients != null) {
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
    // Add each instruction item to the li element
    instructions_list_item_e.text(instructions_array[i] + ".")
    // Place list element on ordered list element
    instructions_list_e.append(instructions_list_item_e);

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
