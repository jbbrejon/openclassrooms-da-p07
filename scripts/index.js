// DOM elements
const searchForm = document.getElementById("global-search");
let searchInput = document.getElementById("item");

// Create new instance of Search class
let myInput = new Input();
// Create new instance of Recipes class
let myRecipes = new Recipes(recipes);

// Display all recipes on page load
myRecipes.renderAll();