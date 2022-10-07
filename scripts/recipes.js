// Class - Recipes
class Recipes {
    constructor(data) {
        this._data = data;
        this._query = "";

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
            console.log(this._query);
        }
    }
}