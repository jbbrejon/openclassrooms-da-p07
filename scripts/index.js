// DOM elements
const searchForm = document.getElementById("global-search");
let searchInput = document.getElementById("item");
let searchIngredients = document.getElementById("item-ingredients");
let searchAppliances = document.getElementById("item-appliances");
let searchUstensils = document.getElementById("item-ustensils");

// Create new instance of Search class
let myInput = new Input();
// Create new instance of Recipes class
let myRecipes = new Recipes(recipes);

// Display all recipes on page load
myRecipes.renderAll();