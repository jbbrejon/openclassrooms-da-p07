// Class - Recipes
class Recipes {
    constructor(data) {
        this._data = data;
        this._query = "";
        this._results = [];

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
            // Reset results array
            this._results = [];
            // Remove existing cards from DOM
            this.removeCards();
            // Search by name (title)
            this.getRecipesbyName();
            // Search by description
            this.getRecipesbyDescription();
            // Add results to DOM
            this.renderResults();
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

    // Check search input / recipe.description match
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

    renderAll() {
        this._data.forEach(recipe => {
            let article = new RecipeTemplate(recipe);
            article.createCard();
            return article
        });
    }

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

}