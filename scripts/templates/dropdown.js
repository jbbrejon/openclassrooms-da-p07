// Description :  RecipeTemplate class (create DOM elements for a recipe)

class DropdownTemplate {
    constructor(category, items) {
        this._category = category;
        this._items = items;
    }
    // Method to create dropdown list
    createList() {
        let dropdown;

        if (this._category === "ingredients") {
            dropdown = document.getElementById('dropdown-ingredients');
            const ul = document.createElement('ul');
            ul.setAttribute("class", "dropdown-ul dropdown-ingredients");
            this._items.forEach(element => {
                let li = document.createElement('li');
                li.setAttribute("class", "dropdown-item");
                li.textContent = element;
                li.dataset.category = 'ingredients';
                ul.appendChild(li);
            });
            dropdown.appendChild(ul);
        }
        else if (this._category === "appliances") {
            dropdown = document.getElementById('dropdown-appliances');
            const ul = document.createElement('ul');
            ul.setAttribute("class", "dropdown-ul dropdown-appliances");
            this._items.forEach(element => {
                let li = document.createElement('li');
                li.setAttribute("class", "dropdown-item");
                li.textContent = element;
                li.dataset.category = 'appliances';
                ul.appendChild(li);
            });
            dropdown.appendChild(ul);
        }
        else if (this._category === "ustensils") {
            dropdown = document.getElementById('dropdown-ustensils');
            const ul = document.createElement('ul');
            ul.setAttribute("class", "dropdown-ul dropdown-ustensils");
            this._items.forEach(element => {
                let li = document.createElement('li');
                li.setAttribute("class", "dropdown-item");
                li.textContent = element;
                li.dataset.category = 'ustensils';
                ul.appendChild(li);
            });
            dropdown.appendChild(ul);
        }

        return dropdown;
    }
}