// Class - Search
class Input {

    // Update this._input value (remove extra space and convert to lower case)
    update(type) {

        if (type == 'global') {
            this._input = searchInput.value.trim().toLowerCase();
            this.query('global');
        }
        else if (type == 'ingredients') {
            this._input = searchIngredients.value.trim().toLowerCase();
            this.query('ingredients');
        }
        else if (type == 'appliances') {
            this._input = searchAppliances.value.trim().toLowerCase();
            this.query('appliances');
        }
        else if (type == 'ustensils') {
            this._input = searchUstensils.value.trim().toLowerCase();
            this.query('ustensils');
        }
    }

    // Initiate query
    query(type) {

        if (type == 'global') {
            myRecipes.globalSearch(this._input, "global");
        }
        else if (type == 'ingredients') {
            myRecipes.globalSearch(this._input, "ingredients");
        }
        else if (type == 'appliances') {
            myRecipes.globalSearch(this._input, "appliances");
        }
        else if (type == 'ustensils') {
            myRecipes.globalSearch(this._input, "ustensils");
        }
    }

    ingredients() {
        this._ingredient = searchIngredients.value.trim().toLowerCase();
        this.query(this._ingredient);
    }
}