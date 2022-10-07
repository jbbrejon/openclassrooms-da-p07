// Class - Search
class Input {

    // Update this._input value (remove extra space and convert to lower case)
    update() {
        this._input = searchInput.value.trim().toLowerCase();
        this.query();
    }

    // Initiate query
    query() {
        myRecipes.globalSearch(this._input);
    }
}