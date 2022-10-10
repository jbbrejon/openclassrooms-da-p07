// Description :  RecipeTemplate class (create DOM elements for a recipe)

class RecipeTemplate {
    constructor(recipe) {
        this._name = recipe.name;
        this._time = recipe.time;
        this._ingredients = recipe.ingredients;
        this._description = recipe.description;
    }
    // Method to create recipe article
    createCard() {
        const sectResults = document.getElementById('sect-results')
        const card = document.createElement('article');
        card.setAttribute("class", "card col-4");
        const cardImg = document.createElement('div');
        cardImg.setAttribute("class", "card-img-background")
        const cardBody = document.createElement('div');
        cardBody.setAttribute("class", "card-body");
        const cardHead = document.createElement('div');
        cardHead.setAttribute("class", "card-head");
        const h2 = document.createElement('h2');
        h2.setAttribute("class", "card-title");
        h2.textContent = this._name;
        const cardTime = document.createElement('div');
        cardTime.setAttribute("class", "card-time");
        const i = document.createElement('i');
        i.setAttribute("class", "bi bi-clock");
        const time = document.createElement('p');
        time.textContent = `${this._time} min`;
        cardTime.appendChild(i);
        cardTime.appendChild(time);
        cardHead.appendChild(h2);
        cardHead.appendChild(cardTime);
        cardBody.appendChild(cardHead);
        card.appendChild(cardImg);
        card.appendChild(cardBody);

        const cardInstructions = document.createElement('div');
        cardInstructions.setAttribute("class", "card-instructions");
        const cardUl = document.createElement('ul');
        cardUl.setAttribute("class", "card-ul");
        this._ingredients.forEach(element => {
            let li = document.createElement('li');
            li.setAttribute("class", "card-li");
            if (element.unit == undefined) {
                if (element.quantity == undefined) {
                    li.innerHTML = `<span>${element.ingredient}</span>`
                }
                else {
                    li.innerHTML = `<span>${element.ingredient}</span>: ${element.quantity}`
                }
            }
            else {
                if (element.unit == "grammes") {
                    li.innerHTML = `<span>${element.ingredient}</span>: ${element.quantity}g`;
                }
                else {
                    li.textContent = `${element.ingredient}: ${element.quantity}${element.unit}`;
                    li.innerHTML = `<span>${element.ingredient}</span>: ${element.quantity} ${element.unit}`;
                }
            }

            cardUl.appendChild(li);
        });
        const cardDesc = document.createElement('p');
        cardDesc.setAttribute("class", "card-description");
        cardDesc.textContent = this._description;
        cardInstructions.appendChild(cardUl);
        cardInstructions.appendChild(cardDesc);
        card.appendChild(cardInstructions);


        sectResults.appendChild(card);
        return card;
    }
}