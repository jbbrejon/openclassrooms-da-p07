// Class - Recipes
class Recipes {
    constructor(data) {
        this._data = data;
        this._query = "";
        this._results = [];
        this._ingredientsInResults = [];
        this._appliancesInResults = [];
        this._ustensilsInResults = [];
        this._tags = [];
        this._filteredResults = [];
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
    globalSearch(input, type) {
        this._query = input;
        // Reset DOM elements
        this.removeCards();
        this.removeDropdown();
        document.getElementById('no-results').style.display = "none"
        // Reset arrays containing previous values
        this._results = [];
        this._ingredientsInResults = [];
        this._appliancesInResults = [];
        this._ustensilsInResults = [];
        // Start search if input is at least 3 characters long
        if (this.isThreeChar()) {
            if (type == 'global') {
                // Search by name (title)
                this.getRecipesbyName(this._data, "global");
                // Search by description
                this.getRecipesbyDescription(this._data, "global");
                // Search by ingredient
                this.getRecipesbyIngredient(this._data, "global", this._query);
                // Get list of ingredients, appliances, ustensils from results array and add dropdown elements to DOM
                this.getIngredients("global");
                this.getAppliances("global");
                this.getUstensils("global");
            }
            else if (type == 'ingredients') {
                // Search by ingredient
                this.getRecipesbyIngredient(this._data, "global", this._query);
                // Get list of ingredients from results array and add dropdown elements to DOM
                this.getIngredients("ingredients");
            }
            else if (type == 'appliances') {
                this.getRecipesbyAppliance(this._data, "global", this._query);
                // Get list of appliances from results array and add dropdown elements to DOM
                this.getAppliances("appliances");
            }
            else if (type == 'ustensils') {
                this.getRecipesbyUstensils(this._data, "global", this._query);
                // Get list of ustensils from results array and add dropdown elements to DOM
                this.getUstensils();
            }
            // Display message if no recipe has been found
            if (this._results.length == 0) {
                // Show no-results message
                document.getElementById('no-results').style.display = "block";
            }
            else {
                // Display results
                this.renderResults();
            }
        }
        else {
            // Display all recipes if input is less than 3 characters long
            this.renderAll();
        }
    }

    // Check if recipe already exists in filtered results
    isId(id, type) {
        let isFound;
        if (type == "global") {
            isFound = this._results.some(recipe => recipe.id == id);
        }
        else if (type == "filtered") {
            isFound = this._filteredResults.some(recipe => recipe.id == id);
        }

        return isFound;
    }

    // Search by name
    getRecipesbyName(array, type) {
        array.forEach(recipe => {
            let recipeId = recipe.id;
            let recipeName = recipe.name;
            // Check if a recipe includes search input characters in its name
            if (recipeName.toLowerCase().includes(this._query)) {
                // Add recipe to results array (only if its id is not yet listed)
                if (!this.isId(recipeId, type)) {
                    if (type == "global") {
                        this._results.push(recipe);
                    }
                    else if (type == "filtered") {
                        this._filteredResults.push(recipe);
                    }
                    return recipe;
                }
            }
            else {
                return "No recipe found";
            }
        });
    }

    // Search by description
    getRecipesbyDescription(array, type) {
        array.forEach(recipe => {
            let recipeId = recipe.id;
            let recipeDesc = recipe.description;
            // Check if a recipe includes search input characters in its description
            if (recipeDesc.toLowerCase().includes(this._query)) {
                // Add recipe to results array (only if its id is not yet listed)
                if (!this.isId(recipeId, type)) {
                    if (type == "global") {
                        this._results.push(recipe);
                    }
                    else if (type == "filtered") {
                        this._filteredResults.push(recipe);
                    }
                    return recipe;
                }
            }
            else {
                return "No recipe found";
            }
        });
    }

    // Search by Ingredient
    getRecipesbyIngredient(array, type, query) {
        array.forEach(recipe => {
            let recipeId = recipe.id;
            let recipeIngredients = recipe.ingredients

            // Check if a recipe includes search input characters in its array of ingredients
            recipeIngredients.forEach(element => {
                if (element.ingredient.toLowerCase().includes(query)) {

                    // Add recipe to results array (only if its id is not yet listed)
                    if (!this.isId(recipeId, type)) {
                        if (type == "global") {
                            this._results.push(recipe);
                        }
                        if (type == "filtered") {
                            this._filteredResults.push(recipe);
                            console.log(this._filteredResults)
                        }

                        return recipe;
                    }
                }
                else {
                    return "No recipe found";
                }
            })

        });
    }

    // Search by Appliance
    getRecipesbyAppliance(array, type, query) {
        array.forEach(recipe => {
            let recipeId = recipe.id;
            let recipeAppliance = recipe.appliance;
            if (recipeAppliance.toLowerCase().includes(query)) {
                if (!this.isId(recipeId, type)) {
                    if (type == "global") {
                        this._results.push(recipe);
                    }
                    if (type == "filtered") {
                        this._filteredResults.push(recipe);
                    }
                }
            }
        });
    }

    // Search by Ustensils
    getRecipesbyUstensils(array, type, query) {
        console.log(query)
        array.forEach(recipe => {
            let recipeId = recipe.id;
            let recipeTools = recipe.ustensils;
            recipeTools.forEach(element => {
                if (element.includes(query)) {
                    console.log("test")
                    if (!this.isId(recipeId, type)) {
                        if (type == "global") {
                            this._results.push(recipe);
                        }
                        if (type == "filtered") {
                            this._filteredResults.push(recipe);
                        }
                    }
                }
            });
        });
    }


    // Get list of ingredients from results array + fill dropdown-ingredients
    getIngredients(type) {
        this._results.forEach(recipe => {
            let recipeIngredients = recipe.ingredients
            recipeIngredients.forEach(element => {
                if (type == "global") {
                    if (!this._ingredientsInResults.includes(element.ingredient)) {
                        this._ingredientsInResults.push(element.ingredient);
                    }
                }
                else if (type == "ingredients") {
                    if (element.ingredient.includes(this._query)) {
                        if (!this._ingredientsInResults.includes(element.ingredient)) {
                            this._ingredientsInResults.push(element.ingredient);
                        }
                    }
                }
            })
        });
        let dropdown = new DropdownTemplate("ingredients", this._ingredientsInResults.sort())
        dropdown.createList();
        return this._ingredientsInResults.sort();
    }



    // Get list of appliances from results array + fill dropdown-appliances
    getAppliances(type) {
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

    // Add tag
    addTag(tag, category) {
        if (!this._tags.includes(tag)) {
            let item = {};
            item["tag"] = tag
            item["category"] = category
            this._tags.push(item);
            let myTags = new TagsTemplate();
            myTags.showTags();
            this.searchByTag(tag, category);
            this.removeCards();
            // Add results to DOM (recipes)
            this.renderFilteredResults();
        }
    }
    // Search by tag from dropdown menu
    searchByTag(tag, category) {
        if (category == "ingredients") {
            this.getRecipesbyIngredient(this._results, "filtered", tag.toLowerCase())
        }
        else if (category == "appliances") {
            this.getRecipesbyAppliance(this._results, "filtered", tag.toLowerCase())

        }
        else if (category == "ustensils") {
            this.getRecipesbyUstensils(this._results, "filtered", tag.toLowerCase())
        }
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
    // Render filteredResults array to DOM
    renderFilteredResults() {
        this._filteredResults.forEach(recipe => {
            let article = new RecipeTemplate(recipe);
            article.createCard();
            return article
        });
    }

    // Remove recipe cards from DOM
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

    // Remove tag
    removeTag(tag) {
        this._filteredResults = [];
        this.removeCards();
        this._tags = this._tags.filter(item => item.tag !== tag);
        let myTags = new TagsTemplate();
        myTags.showTags();

        if (this._tags.length == 0) {
            this.renderResults();
        }
        else {
            this._tags.forEach(item => {
                this.searchByTag(item.tag, item.category);

            });
            console.log(this._results)
            this.renderFilteredResults();
        }

        return this._tags;
    }
}