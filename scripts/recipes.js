// Class - Recipes
class Recipes {
    constructor(data) {
        this._data = data;
        this._query = "";
        this._results = [];
        this._ingredientsInResults = [];
        this._appliancesInResults = [];
        this._ustensilsInResults = [];
    }

    // Check if query is at least 3 characters long
    isThreeChar() {
        if (this._query.length > 2) {
            return true
        }
        else {
            return false
        }
    }

    // Search method
    globalSearch(input) {
        this._query = input;
        if (this.isThreeChar()) {

            // Reset arrays containing previous values
            this._results = [];
            this._ingredientsInResults = [];
            this._appliancesInResults = [];
            this._ustensilsInResults = [];

            // Reset DOM elements
            this.removeCards();
            this.removeDropdown()
            document.getElementById('no-results').style.display = "none";

            // Search by name (title)
            this.getRecipesbyName();
            // Search by description
            this.getRecipesbyDescription();
            // Search by ingredient
            this.getRecipesbyIngredient();

            if (this._results.length == 0) {
                // Show no-results message
                document.getElementById('no-results').style.display = "block";
            }
            else {
                // Get list of ingredients, appliances from results array and add dropdown elements to DOM
                this.getIngredients();
                this.getAppliances();
                this.getUstensils();
                // Add results to DOM (recipes)
                this.renderResults();
            }
        }
        else {
            // Display all recipes
            this.renderAll();
        }
    }
    // Check if recipe already exists in filtered results
    isId(id) {
        let isFound = this._results.some(recipe => recipe.id == id);
        return isFound;
    }

    // Search by name
    getRecipesbyName() {
        this._data.forEach(recipe => {
            let recipeId = recipe.id;
            let recipeName = recipe.name;
            // Check if a recipe includes search input characters in its name
            if (recipeName.toLowerCase().includes(this._query)) {
                // Add recipe to results array (only if its id is not yet listed)
                if (!this.isId(recipeId)) {
                    this._results.push(recipe)
                    return recipe;
                }
            }
            else {
                return "No recipe found";
            }
        });
    }

    // Search by description
    getRecipesbyDescription() {
        this._data.forEach(recipe => {
            let recipeId = recipe.id;
            let recipeDesc = recipe.description;
            // Check if a recipe includes search input characters in its description
            if (recipeDesc.toLowerCase().includes(this._query)) {
                // Add recipe to results array (only if its id is not yet listed)
                if (!this.isId(recipeId)) {
                    this._results.push(recipe);
                    return recipe;
                }
            }
            else {
                return "No recipe found";
            }
        });
    }

    // Search by Ingredient
    getRecipesbyIngredient() {
        this._data.forEach(recipe => {
            let recipeId = recipe.id;
            let recipeIngredients = recipe.ingredients
            // Check if a recipe includes search input characters in its array of ingredients
            recipeIngredients.forEach(element => {
                if (element.ingredient.toLowerCase().includes(this._query)) {
                    // Add recipe to results array (only if its id is not yet listed)
                    if (!this.isId(recipeId)) {
                        this._results.push(recipe);
                        return recipe;
                    }
                }
                else {
                    return "No recipe found";
                }
            })

        });
    }

    // Get list of ingredients from results array + fill dropdown-ingredients
    getIngredients() {
        this._results.forEach(recipe => {
            let recipeIngredients = recipe.ingredients
            recipeIngredients.forEach(element => {
                if (!this._ingredientsInResults.includes(element.ingredient)) {
                    this._ingredientsInResults.push(element.ingredient);
                }
            })
        });
        let dropdown = new DropdownTemplate("ingredients", this._ingredientsInResults.sort())
        dropdown.createList();
        return this._ingredientsInResults.sort();
    }
    // Get list of appliances from results array + fill dropdown-appliances
    getAppliances() {
        this._results.forEach(recipe => {
            let recipeAppliance = recipe.appliance;
            if (!this._appliancesInResults.includes(recipeAppliance)) {
                this._appliancesInResults.push(recipeAppliance);
            }
        });
        let dropdown = new DropdownTemplate("appliances", this._appliancesInResults.sort())
        dropdown.createList();
        return this._appliancesInResults.sort();
    }
    // Get list of ustensils from results array + fill dropdown-ustensils
    getUstensils() {
        this._results.forEach(recipe => {
            let recipeTools = recipe.ustensils
            recipeTools.forEach(element => {
                if (!this._ustensilsInResults.includes(element)) {
                    this._ustensilsInResults.push(element);
                }
            })
        });
        let dropdown = new DropdownTemplate("ustensils", this._ustensilsInResults.sort())
        dropdown.createList();
        return this._ustensilsInResults.sort();
    }


    // Render data array to DOM
    renderAll() {
        this._data.forEach(recipe => {
            let article = new RecipeTemplate(recipe);
            article.createCard();
            return article
        });
    }
    // Render results array to DOM
    renderResults() {
        this._results.forEach(recipe => {
            let article = new RecipeTemplate(recipe);
            article.createCard();
            return article
        });
    }

    // Remove recipe to DOM
    removeCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.remove();
        });
        return "Recipe cards removed";
    }

    // Remove dropdown elements
    removeDropdown() {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(element => {
            element.remove();
        });
        return "Dropdown items removed";
    }

}